function CartDAO(database) {
  'use strict';

  this.db = database;

  this.getCart = function (userId) {
    'use strict';

    /*
     * TODO-lab5
     *
     * LAB #5: Implement the getCart() method.
     *
     * Query the "cart" collection by userId and pass the cart to the
     * callback function.
     *
     */

    const userCart = {
      userId: userId,
      items: [],
    };
    const dummyItem = this.createDummyItem();
    userCart.items.push(dummyItem);

    // TODO-lab5 Replace all code above (in this method).

    // TODO Include the following line in the appropriate
    // place within your code to return the userCart
    return userCart;
  };

  this.itemInCart = function (userId, itemId) {
    'use strict';

    /*
     *
     * TODO-lab6
     *
     * LAB: #6
     *
     * Write a query that will determine whether or not the cart associated
     * with the userId contains an item identified by itemId. If the cart
     * does contain the item, pass the item to the callback. If it does not,
     * pass the value null to the callback.
     *
     * NOTE: You should return only the matching item to. Do not
     * return an array of one or more items or the entire cart.
     *
     * SUGGESTION: While it is not necessary, you might find it easier to
     * use the $ operator in a projection document in your call to find() as
     * a means of selecting the matching item. Again, take care to return only
     * the matching item (not an array)  See:
     * https://docs.mongodb.org/manual/reference/operator/projection/positional/
     *
     * As context for this method to better understand its purpose, look at
     * how cart.itemInCart is used in the mongomart.js app.
     *
     */

    return null;

    // TODO-lab6 Replace all code above (in this method).
  };

  /*
   * This solution is provide as an example to you of several query
   * language features that are valuable in update operations.
   * This method adds the item document passed in the item parameter to the
   * user's cart. Note that this solution works regardless of whether the
   * cart already contains items or is empty. addItem will be called only
   * if the cart does not already contain the item. The route handler:
   * router.post("/user/:userId/cart/items/:itemId"...
   * handles this. Please review how that method works to have a complete
   * understanding of how addItem is used.
   *
   * NOTE: One may use either updateOne() or findOneAndUpdate() to
   * write this method. We did not discuss findOneAndUpdate() in class,
   * but it provides a very straightforward way of solving this problem.
   * See the following for documentation:
   * http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findOneAndUpdate
   *
   */
  this.addItem = async function (userId, item) {
    'use strict';

    const documentUpdated = await this.db.collection('cart').findOneAndUpdate(
      // query for the cart with the userId passed as a parameter.
      { userId: userId },
      // update the user's cart by pushing an item onto the items array
      { $push: { items: item } },
      // findOneAndUpdate() takes an options document as a parameter.
      // Here we are specifying that the database should insert a cart
      // if one doesn't already exist (i.e. "upsert: true") and that
      // findOneAndUpdate() should pass the updated document to the
      // callback function rather than the original document
      // (i.e., "returnOriginal: false").
      {
        upsert: true,
        returnDocument: 'after',
      },
    );
    return documentUpdated.value;
  };

  this.updateQuantity = function (userId, itemId, quantity, callback) {
    'use strict';

    /*
     * TODO-lab7
     *
     * LAB #7: Update the quantity of an item in the user's cart in the
     * database by setting quantity to the value passed in the quantity
     * parameter. If the value passed for quantity is 0, remove the item
     * from the user's cart stored in the database.
     *
     * Return the updated user's cart.
     *
     * NOTE: Use the solution for addItem as a guide to your solution for
     * this problem. There are several ways to solve this. By far, the
     * easiest is to use the $ operator. See:
     * https://docs.mongodb.org/manual/reference/operator/update/positional/
     *
     */

    const userCart = {
      userId: userId,
      items: [],
    };
    const dummyItem = this.createDummyItem();
    dummyItem.quantity = quantity;
    userCart.items.push(dummyItem);
    return userCart;
  };

  this.createDummyItem = function () {
    'use strict';

    const item = {
      _id: 1,
      title: 'Gray Hooded Sweatshirt',
      description: 'The top hooded sweatshirt we offer',
      slogan: 'Made of 100% cotton',
      stars: 0,
      category: 'Apparel',
      img_url: '/img/products/hoodie.jpg',
      price: 29.99,
      quantity: 1,
      reviews: [],
    };

    return item;
  };
}

module.exports.CartDAO = CartDAO;
