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
     * passed to the callback. The "All" category should contain the total
     * number of items across all categories as its value for "num". The
     * most efficient way to calculate this value is to iterate through
     * the array of categories produced by your aggregation query, summing
     * counts of items in each category.
     *
     * Ensure categories are organized in alphabetical order before passing
     * to the callback.
     *
     * TODO-lab1A Replace all code above (in this method).
     * TODO Include the following line in the appropriate
     * categories.unshift(allCategories)
     *
     */

    let sum = 0;

    const pipeline = [
      { $group: { _id: '$category', num: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ];

    const categories = await this.db
      .collection('item')
      .aggregate(pipeline)
      .toArray();

    categories.forEach((category) => (sum += category.num));
    categories.unshift({ _id: 'All', num: sum });

    return categories;
  };

  this.getItems = function (category, page, itemsPerPage, callback) {
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
     * page. Pass these items to the callback function.
     *
     * Sort items in ascending order based on the _id field. You must use
     * this sort to answer the final project questions correctly.
     *
     * Note: Since "All" is not listed as the category for any items,
     * you will need to query the "item" collection differently for "All"
     * than you do for other categories.
     *
     */

    let query = {};

    if (category !== 'All') {
      query = { category: category };
    }

    return this.db
      .collection('item')
      .find(query)
      .sort({ _id: 1 })
      .limit(itemsPerPage)
      .skip(itemsPerPage * page)
      .toArray();
  };

  this.getNumItems = function (category, callback) {
    'use strict';
    /*
     * TODO-lab1C:
     *
     * LAB #1C: Implement the getNumItems method()
     *
     * Write a query that determines the number of items in a category
     * and pass the count to the callback function. The count is used in
     * the mongomart application for pagination. The category is passed
     * as a parameter to this method.
     *
     * See the route handler for the root path (i.e. "/") for an example
     * of a call to the getNumItems() method.
     *
     */

    let query = {};
    if (category !== 'All') {
      query = { category: category };
    }

    return this.db.collection('item').countDocuments(query);
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
     * itemsPerPage to select the appropriate matching products. Pass these
     * items to the callback function.
     *
     * searchItems() depends on a text index. Before implementing
     * this method, create a SINGLE text index on title, slogan, and
     * description. You should simply do this in the mongo shell.
     *
     */
    let querySearch = { $text: { $search: query } };
    if (query.trim() === '') {
      querySearch = {};
    }

    return this.db
      .collection('item')
      .find(querySearch)
      .sort({ _id: 1 })
      .skip(page * itemsPerPage)
      .limit(itemsPerPage)
      .toArray();
  };

  this.getNumSearchItems = function (query) {
    'use strict';

    /*
     * TODO-lab2B
     *
     * LAB #2B: Using the value of the query parameter passed to this
     * method, count the number of items in the "item" collection matching
     * a text search. Pass the count to the callback function.
     *
     * getNumSearchItems() depends on the same text index as searchItems().
     * Before implementing this method, ensure that you've already created
     * a SINGLE text index on title, slogan, and description. You should
     * simply do this in the mongo shell.
     */
    let searchQuery = { $text: { $search: query } };
    if (query.trim() === '') {
      searchQuery = {};
    }
    return this.db.collection('item').countDocuments(searchQuery);
  };

  this.getItem = function (itemId) {
    'use strict';

    /*
     * TODO-lab3
     *
     * LAB #3: Implement the getItem() method.
     *
     * Using the itemId parameter, query the "item" collection by
     * _id and pass the matching item to the callback function.
     *
     */

    const query = { _id: itemId };
    return this.db.collection('item').findOne(query);
  };

  this.getRelatedItems = function () {
    'use strict';

    return this.db.collection('item').find({}).limit(4).toArray();
  };

  this.addReview = function (itemId, comment, name, stars, callback) {
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
    const query = { _id: itemId };
    const updateDocument = {
      $push: {
        reviews: reviewDoc,
      },
    };

    return this.db.collection('item').updateOne(query, updateDocument);
  };
}

module.exports.ItemDAO = ItemDAO;
