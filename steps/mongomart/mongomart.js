const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ItemDAO = require('./items').ItemDAO;
const CartDAO = require('./cart').CartDAO;

// Set up express
const app = express();
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));

/*
 Configure nunjucks to work with express
 Not using consolidate because I'm waiting on better support for template inheritance with
 nunjucks via consolidate. See: https://github.com/tj/consolidate.js/pull/224
*/
const env = nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const nunjucksDate = require('nunjucks-date');
nunjucksDate.setDefaultFormat('MMMM Do YYYY, h:mm:ss a');
env.addFilter('date', nunjucksDate);

const ITEMS_PER_PAGE = 5;

// Hardcoded USERID for use with the shopping cart portion
const USERID = '558098a65133816958968d88';

MongoClient.connect('mongodb://localhost:27017/SfeirSchool', function (err, db) {
  'use strict';

  assert.equal(null, err);
  console.log('Successfully connected to MongoDB.');

  const items = new ItemDAO(db);
  const cart = new CartDAO(db);

  const router = express.Router();

  // Homepage
  router.get('/', function (req, res) {
    'use strict';

    const page = req.query.page ? parseInt(req.query.page) : 0;
    const category = req.query.category ? req.query.category : 'All';

    items.getCategories(function (categories) {
      items.getItems(category, page, ITEMS_PER_PAGE, function (pageItems) {
        items.getNumItems(category, function (itemCount) {
          let numPages = 0;
          if (itemCount > ITEMS_PER_PAGE) {
            numPages = Math.ceil(itemCount / ITEMS_PER_PAGE);
          }

          res.render('home', {
            category_param: category,
            categories: categories,
            useRangeBasedPagination: false,
            itemCount: itemCount,
            pages: numPages,
            page: page,
            items: pageItems,
          });
        });
      });
    });
  });

  router.get('/search', function (req, res) {
    'use strict';

    const page = req.query.page ? parseInt(req.query.page) : 0;
    const query = req.query.query ? req.query.query : '';

    items.searchItems(query, page, ITEMS_PER_PAGE, function (searchItems) {
      items.getNumSearchItems(query, function (itemCount) {
        let numPages = 0;

        if (itemCount > ITEMS_PER_PAGE) {
          numPages = Math.ceil(itemCount / ITEMS_PER_PAGE);
        }

        res.render('search', {
          queryString: query,
          itemCount: itemCount,
          pages: numPages,
          page: page,
          items: searchItems,
        });
      });
    });
  });

  router.get('/item/:itemId', function (req, res) {
    'use strict';

    const itemId = parseInt(req.params.itemId);

    items.getItem(itemId, function (item) {
      console.log(item);

      if (item == null) {
        res.status(404).send('Item not found.');
        return;
      }

      let stars = 0;
      let numReviews = 0;
      let reviews = [];

      if ('reviews' in item) {
        numReviews = item.reviews.length;

        for (let i = 0; i < numReviews; i++) {
          const review = item.reviews[i];
          stars += review.stars;
        }

        if (numReviews > 0) {
          stars = stars / numReviews;
          reviews = item.reviews;
        }
      }

      items.getRelatedItems(function (relatedItems) {
        console.log(relatedItems);
        res.render('item', {
          userId: USERID,
          item: item,
          stars: stars,
          reviews: reviews,
          numReviews: numReviews,
          relatedItems: relatedItems,
        });
      });
    });
  });

  router.post('/item/:itemId/reviews', function (req, res) {
    'use strict';

    const itemId = parseInt(req.params.itemId);
    const review = req.body.review;
    const name = req.body.name;
    const stars = parseInt(req.body.stars);

    items.addReview(itemId, review, name, stars, function (itemDoc) {
      res.redirect('/item/' + itemId);
    });
  });

  /*
   *
   * Since we are not maintaining user sessions in this application, any interactions with
   * the cart will be based on a single cart associated with the the USERID constant we have
   * defined above.
   *
   */
  router.get('/cart', function (req, res) {
    res.redirect('/user/' + USERID + '/cart');
  });

  router.get('/user/:userId/cart', function (req, res) {
    'use strict';

    const userId = req.params.userId;
    cart.getCart(userId, function (userCart) {
      const total = cartTotal(userCart);
      res.render('cart', {
        userId: userId,
        updated: false,
        cart: userCart,
        total: total,
      });
    });
  });

  router.post('/user/:userId/cart/items/:itemId', function (req, res) {
    'use strict';

    const userId = req.params.userId;
    const itemId = parseInt(req.params.itemId);

    const renderCart = function (userCart) {
      const total = cartTotal(userCart);
      res.render('cart', {
        userId: userId,
        updated: true,
        cart: userCart,
        total: total,
      });
    };

    cart.itemInCart(userId, itemId, function (item) {
      if (item == null) {
        items.getItem(itemId, function (item) {
          item.quantity = 1;
          cart.addItem(userId, item, function (userCart) {
            renderCart(userCart);
          });
        });
      } else {
        cart.updateQuantity(userId, itemId, item.quantity + 1, function (userCart) {
          renderCart(userCart);
        });
      }
    });
  });

  router.post('/user/:userId/cart/items/:itemId/quantity', function (req, res) {
    'use strict';

    const userId = req.params.userId;
    const itemId = parseInt(req.params.itemId);
    const quantity = parseInt(req.body.quantity);

    cart.updateQuantity(userId, itemId, quantity, function (userCart) {
      const total = cartTotal(userCart);
      res.render('cart', {
        userId: userId,
        updated: true,
        cart: userCart,
        total: total,
      });
    });
  });

  function cartTotal(userCart) {
    'use strict';

    let total = 0;
    for (let i = 0; i < userCart.items.length; i++) {
      const item = userCart.items[i];
      total += item.price * item.quantity;
    }

    return total;
  }

  // Use the router routes in our application
  app.use('/', router);

  // Start the server listening
  const server = app.listen(3000, function () {
    const port = server.address().port;
    console.log('Mongomart server listening on port %s.', port);
  });
});
