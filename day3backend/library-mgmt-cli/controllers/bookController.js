const CategoryModel = require("../models/category");
const categoryController = require("./categoryController");
const BookModel = require("../models/book");

const printAllBooks = async () => {
  let books = await BookModel.find({});
  console.log("-------");
  books.forEach((book) => console.log(book.title));
  console.log("-------");
};
const addBook = async (title, price, bookCategory, author) => {
  let category = await CategoryModel.findOne({ name: bookCategory });
  if (category) {
    const book = new BookModel({
      title: title,
      price: price,
      category: category._id,
      author: author,
    });
    await book
      .save()
      .then((data) =>
        console.log("Following book has been added successfully:", data)
      );
  } else {
    console.log(
      "There is no such category. These are the available valid categories. Please try again with one of these."
    );
    await categoryController.printAllCategories();
  }
};
const searchBook = async (title) => {
  if (!title || title.length === 0) {
    console.log(
      "\nBook title is missing. Please try again with some Book title."
    );
    return;
  }
  let re = new RegExp(title, "i");
  await BookModel.find({ title: re }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      if (!docs || docs.length === 0) {
        console.log("No matching records found.");
      } else {
        console.log("Matching docs are", docs);
      }
    }
  });
};
const removeBook = async (bookToDelete) => {
  if (!bookToDelete || bookToDelete.length === 0) {
    console.log(
      "\nBook title is missing. Please try again with some Book title."
    );
  
  } else {
      await BookModel.findOne({ title: bookToDelete }, (err, doc) => {
        if (err) {
          console.log(err);
        } else if (!doc || doc.length === 0) {
          console.log(`\nBook with title ${bookToDelete} doesn't exist.`);
        } else {
          doc.remove();
          console.log(`\nBook ${bookToDelete} deleted successfully`);
        }
      });
  }
};
module.exports = { printAllBooks, addBook, searchBook, removeBook };
