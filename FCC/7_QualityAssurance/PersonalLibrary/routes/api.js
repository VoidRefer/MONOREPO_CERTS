/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const libraryController = require("../Controllers/Library")

module.exports = function (app) {

  app.route('/api/books')
    .get(libraryController.getAllBooks)
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

    
    .post(libraryController.addNewBook)
      //response will contain new book object including atleast _id and title

    
    .delete(libraryController.deleteAllBooks);
      //if successful response will be 'complete delete successful'
    

  app.route('/api/books/:id')
    .get(libraryController.getBookById)
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

    
    .post(libraryController.addComment)
      //json res format same as .get

    
    .delete(libraryController.deleteBookById)
      //if successful response will be 'delete successful'
  
};
