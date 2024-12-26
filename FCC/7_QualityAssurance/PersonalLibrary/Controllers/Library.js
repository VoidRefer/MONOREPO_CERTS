// Implement the logic for the API

const { default: mongoose } = require("mongoose");
const Book = require("./DB")

module.exports = {
    async getAllBooks(req, res) {
        try {
            const books = await Book.find({});
            const response = books.map(book => ({
                _id: book._id,
                title: book.title,
                commentcount: book.comments.length
            }));
            res.json(response);
        } catch (err) {
            console.log(err);
        }
    },

    async addNewBook(req, res) {
        const title = req.body.title;

        if(!title) return res.send("missing required field title");

        try {
            const newBook = new Book( {title, comments: []} );
            const savedBook = await newBook.save();
            res.json( {_id: savedBook._id, title: savedBook.title} );
        } catch (err) {
            console.log(err);
        }
    },

    async deleteAllBooks(req, res) {
        try {
            await Book.deleteMany({});
            res.send("complete delete successful");
        } catch (err) {
            console.log(err);
        }
    },

    async getBookById(req, res) {
        const bookId = req.params.id;

        // Validate if the id is a valid ObjectID
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.send("no book exists");
        }

        try {
            const book = await Book.findById(bookId);
            
            if (!book) return res.send("no book exists");

            res.json( {_id: book._id, title: book.title, comments: book.comments} );
        } catch (err) {
            console.log(err);
        }
    },

    async addComment(req, res) {
        const bookId = req.params.id;
        const comment = req.body.comment;

        // Validate if the id is a valid ObjectID
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.send("no book exists");
        }

        if (!comment) return res.send("missing required field comment");

        try {
            const book = await Book.findById(bookId);
            
            if (!book) return res.send("no book exists");

            book.comments.push(comment);
            const updatedBook = await book.save();
            res.json( {_id: updatedBook._id, title: updatedBook.title, comments: updatedBook.comments} );
        } catch (err) {
            console.log(err);
        }
    },

    async deleteBookById(req, res) {
        const bookId = req.params.id;

        // Validate if the id is a valid ObjectID
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.send("no book exists");
        }

        try {
            const book = await Book.findByIdAndDelete(bookId);

            if (!book) return res.send("no book exists");

            res.send("delete successful");
        } catch (err) {
            console.log(err);
        }
    }
};