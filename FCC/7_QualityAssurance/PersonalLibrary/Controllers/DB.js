// Handle MongoDb connection and schema

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true } )
  .then( () => console.log("MongoDB connected"))
  .catch( err => console.error("MongoDB connection error:", err) );

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true},
  comments: [String]
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;