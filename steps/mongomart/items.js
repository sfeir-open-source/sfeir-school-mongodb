function ItemDAO(database) {
  'use strict';

  this.db = database;

  this.getCategories = async function () {
    'use strict';

    /*
     * TODO-lab1A
     *
     * LAB #1A: Implement the getCategories() method.
     *
     * Write an aggregation query on the "item" collection to return the
     * total number of items in each category. The documents in the array
     * output by your aggregation should contain fields for "_id" and "num".
     *
     * HINT: Test your mongodb query in the shell first before implementing
     * it in JavaScript.
     *
     * In addition to the categories created by your aggregation query,
     * include a document for category "All" in the array of categories
     * The "All" category should contain the total
     * number of items across all categories as its value for "num". The
     * most efficient way to calculate this value is to iterate through
     * the array of categories produced by your aggregation query, summing
     * counts of items in each category.
     *
     * Ensure categories are organized in alphabetical order
     *
     * TODO-lab1A Replace all code above (in this method).
     * TODO Include the following line in the appropriate
     * categories.unshift(allCategories)
     *
     */

    const categories = [];
    const allCategories = {
      _id: 'All',
      num: 9999,
    };

    return categories;
  };

  this.getItems = function (category, page, itemsPerPage) {
    'use strict';

    /*
     * TODO-lab1B
     *
     * LAB #1B: Implement the getItems() method.
     *
     * Create a query on the "item" collection to select only the items
     * that should be displayed for a particular page of a given category.
     * The category is passed as a parameter to getItems().
     *
     * Use sort(), skip(), and limit() and the method parameters: page and
     * itemsPerPage to identify the appropriate products to display on each
     * page. Return these items
     *
     * Sort items in ascending order based on the _id field. You must use
     * this sort to answer the final project questions correctly.
     *
     * Note: Since "All" is not listed as the category for any items,
     * you will need to query the "item" collection differently for "All"
     * than you do for other categories.
     *
     */

    const pageItem = this.createDummyItem();
    const pageItems = [];
    for (let i = 0; i < 5; i++) {
      pageItems.push(pageItem);
    }

    // TODO-lab1B Replace all code above (in this method).

    // TODO Include the following line in the appropriate
    // place within your code to return the items for the selected page
    return pageItems;
  };

  this.getNumItems = function (category) {
    'use strict';

    const numItems = 0;

    /*
     * TODO-lab1C:
     *
     * LAB #1C: Implement the getNumItems method()
     *
     * Write a query that determines the number of items in a category
     * and return the count. The count is used in
     * the mongomart application for pagination. The category is passed
     * as a parameter to this method.
     *
     * See the route handler for the root path (i.e. "/") for an example
     * of a call to the getNumItems() method.
     *
     */

    // TODO Include the following line in the appropriate
    return numItems;
  };

  this.searchItems = function (query, page, itemsPerPage) {
    'use strict';

    /*
     * TODO-lab2A
     *
     * LAB #2A: Implement searchItems()
     *
     * Using the value of the query parameter passed to searchItems(),
     * perform a text search against the "item" collection.
     *
     * Sort the results in ascending order based on the _id field.
     *
     * Select only the items that should be displayed for a particular
     * page. For example, on the first page, only the first itemsPerPage
     * matching the query should be displayed.
     *
     * Use limit() and skip() and the method parameters: page and
     * itemsPerPage to select the appropriate matching products. Return these items
     *
     * searchItems() depends on a text index. Before implementing
     * this method, create a SINGLE text index on title, slogan, and
     * description. You should simply do this in the mongo shell.
     *
     */

    const item = this.createDummyItem();
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push(item);
    }

    // TODO-lab2A Replace all code above (in this method).

    // TODO Include the following line in the appropriate
    // place within your code to return  the items for the selected page
    // of search results
    return items;
  };

  this.getNumSearchItems = function (query) {
    'use strict';

    const numItems = 0;

    /*
     * TODO-lab2B
     *
     * LAB #2B: Using the value of the query parameter passed to this
     * method, count the number of items in the "item" collection matching
     * a text search. return the count
     *
     * getNumSearchItems() depends on the same text index as searchItems().
     * Before implementing this method, ensure that you've already created
     * a SINGLE text index on title, slogan, and description. You should
     * simply do this in the mongo shell.
     */

    return numItems;
  };

  this.getItem = function (itemId) {
    'use strict';

    /*
     * TODO-lab3
     *
     * LAB #3: Implement the getItem() method.
     *
     * Using the itemId parameter, query the "item" collection by
     * _id
     *
     */

    const item = this.createDummyItem();

    // TODO-lab3 Replace all code above (in this method).

    // TODO Include the following line in the appropriate
    // place within your code to pass the matching item
    return item;
  };

  this.getRelatedItems = function () {
    'use strict';

    return this.db.collection('item').find({}).limit(4).toArray();
  };

  this.addReview = function (itemId, comment, name, stars) {
    'use strict';

    /*
     * TODO-lab4
     *
     * LAB #4: Implement addReview().
     *
     * Using the itemId parameter, update the appropriate document in the
     * "item" collection with a new review. Reviews are stored as an
     * array value for the key "reviews". Each review has the fields:
     * "name", "comment", "stars", and "date".
     *
     */

    const reviewDoc = {
      name: name,
      comment: comment,
      stars: stars,
      date: Date.now(),
    };

    // TODO replace the following two lines with your code that will
    // update the document with a new review.
    const doc = this.createDummyItem();
    doc.reviews = [reviewDoc];

    return doc;
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
      reviews: [],
    };

    return item;
  };
}

module.exports.ItemDAO = ItemDAO;
