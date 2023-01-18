const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

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

// Create an instance of MongoDBClient
const mongoClient = new MongoClient('mongodb://127.0.0.1:27017');

async function runMongoMart() {
  try {
    await mongoClient.connect();
    await mongoClient.db('SfeirSchool').command({ ping: 1 });
    console.log('Connected to MongoDB');

    const router = express.Router();
    const db = mongoClient.db('SfeirSchool');
    const items = new ItemDAO(db);
    const cart = new CartDAO(db);

    router.get('/', async (req, res) => {
      const page = req.query.page ? parseInt(req.query.page) : 0;
      const category = req.query.category ? req.query.category : 'All';
      const categories = await items.getCategories();
      const products = await items.getItems(category, page, ITEMS_PER_PAGE);
      const productQuantity = await items.getNumItems(category);

      let numPages = 0;
      if (productQuantity > ITEMS_PER_PAGE) {
        numPages = Math.ceil(productQuantity / ITEMS_PER_PAGE);
      }

      res.render('home', {
        category_param: category,
        categories: categories,
        useRangeBasedPagination: false,
        itemCount: productQuantity,
        pages: numPages,
        page: page,
        items: products,
      });
    });

    router.get('/search', async (req, res) => {
      const page = req.query.page ? parseInt(req.query.page) : 0;
      const query = req.query.query ? req.query.query : '';
      const searchItems = await items.searchItems(query, page, ITEMS_PER_PAGE);
      const searchItemsNumber = await items.getNumSearchItems(query);

      let numPages = 0;

      if (searchItemsNumber > ITEMS_PER_PAGE) {
        numPages = Math.ceil(searchItemsNumber / ITEMS_PER_PAGE);
      }
      res.render('search', {
        queryString: query,
        itemCount: searchItemsNumber,
        pages: numPages,
        page: page,
        items: searchItems,
      });
    });

    router.get('/item/:itemId', async (req, res) => {
      let stars = 0;
      let numReviews = 0;
      let reviews = [];
      const itemId = parseInt(req.params.itemId);
      const item = await items.getItem(itemId);
      const relatedItems = await items.getRelatedItems();

      if (item == null) {
        res.status(404).send('Item not found.');
        return;
      }

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
      res.render('item', {
        userId: USERID,
        item: item,
        stars: stars,
        reviews: reviews,
        numReviews: numReviews,
        relatedItems: relatedItems,
      });
    });

    router.post('/item/:itemId/reviews', async (req, res) => {
      const itemId = parseInt(req.params.itemId);
      const review = req.body.review;
      const name = req.body.name;
      const stars = parseInt(req.body.stars);
      await items.addReview(itemId, review, name, stars);
      res.redirect('/item/' + itemId);
    });

    router.get('/cart', function (req, res) {
      res.redirect('/user/' + USERID + '/cart');
    });

    router.get('/user/:userId/cart', async (req, res) => {
      const userId = req.params.userId;
      const userCart = await cart.getCart(userId);
      const total = cartTotal(userCart);
      res.render('cart', {
        userId: userId,
        updated: true,
        cart: userCart,
        total: total,
      });
    });

    router.post('/user/:userId/cart/items/:itemId', async (req, res) => {
      const userId = req.params.userId;
      const itemId = parseInt(req.params.itemId);
      const renderer = (userCart) => {
        const total = cartTotal(userCart);
        res.render('cart', {
          userId: userId,
          updated: true,
          cart: userCart,
          total: total,
        });
      };
      const item = await cart.itemInCart(userId, itemId);
      if (!Boolean(item)) {
        return items
          .getItem(itemId)
          .then((item) => ({ ...item, quantity: 1 }))
          .then((item) => cart.addItem(userId, item))
          .then(renderer);
      } else {
        return cart
          .updateQuantity(userId, itemId, item.quantity + 1)
          .then(renderer);
      }
    });

    router.post(
      '/user/:userId/cart/items/:itemId/quantity',
      async (req, res) => {
        const userId = req.params.userId;
        const itemId = parseInt(req.params.itemId);
        const quantity = parseInt(req.body.quantity);
        const userCart = await cart.updateQuantity(userId, itemId, quantity);
        const total = cartTotal(userCart);
        return res.render('cart', {
          userId: userId,
          updated: true,
          cart: userCart,
          total: total,
        });
      },
    );

    app.use('/', router);
    const server = app.listen(3000, function () {
      const port = server.address().port;
      console.log('Mongomart server listening on port %s.', port);
    });
  } catch (error) {
    console.error(error);
    mongoClient.close().then(() => process.exit(1));
  }
}

function cartTotal(userCart) {
  'use strict';

  let total = 0;
  for (let i = 0; i < userCart.items.length; i++) {
    const item = userCart.items[i];
    total += item.price * item.quantity;
  }

  return total;
}

runMongoMart().catch((error) => {
  console.error(error);
  mongoClient.close();
  process.exit(1);
});
