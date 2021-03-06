const CategoryModel = require("../models/category");
const categoryController = require("./categoryController");
const BookModel = require("../models/book");
const greenColor = "\x1b[32m";
const resetColor = "\x1b[0m";

const printAllBooks = async () => {
  let books = await BookModel.find({}).populate("category");
  return books;
  // console.log(greenColor + "=============================" + resetColor);
  // books.forEach((book) =>
  //   console.error(
  //     greenColor +
  //       "Title: " +
  //       book.title +
  //       "\nCategory: " +
  //       book.category.name +
  //       "\nAuthors: " +
  //       book.author.join(", ") +
  //       "\nPrice: " +
  //       book.price +
  //     "\n=============================" +
  //     resetColor
  //   )
  // );
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
        console.log(
          greenColor +
            "\nFollowing book has been added successfully:" +
            data +
            resetColor
        )
      );
  } else {
    console.log(
      greenColor +
        "\nThere is no such category. These are the available valid categories. Please try again with one of these." +
        resetColor
    );
    await categoryController.printAllCategories();
  }
};
const searchBook = async (title) => {
  if (!title || title.length === 0) {
    console.log(
      greenColor +
        "\nBook title is missing. Please try again with some Book title." +
        resetColor
    );
    return;
  }
  let re = new RegExp(title, "i");
  await BookModel.find({ title: re })
    .then((docs) => {
      if (!docs || docs.length === 0) {
        console.log(greenColor + "\nNo matching records found." + resetColor);
      } else {
        console.log(greenColor + "\nMatching docs are" + docs + resetColor);
      }
    })
    .catch((err) => console.log(err));
};
const removeBook = async (bookToDelete) => {
  if (!bookToDelete || bookToDelete.length === 0) {
    console.log(
      "\nBook title is missing. Please try again with some Book title."
    );
  } else {
    await BookModel.findOne({ title: bookToDelete })
      .then((doc) => {
        if (!doc || doc.length === 0) {
          console.log(
            greenColor +
              `\nBook with title ${bookToDelete} doesn't exist.` +
              resetColor
          );
        } else {
          doc.remove();
          console.log(
            greenColor +
              `\nBook ${bookToDelete} deleted successfully` +
              resetColor
          );
        }
      })
      .catch((err) => console.log(err));
  }
};
const removeBookByID = async (bookID) => {
  let result;
  if (!bookID || bookID.length === 0) {
    result = "Book title is missing. Please try again with valid Book ID.";
  } else {
    await BookModel.findOne({ _id: bookID })
      .then(async (doc) => {
        console.log("doc is: ", doc);
        if (!doc || doc.length === 0) {
          console.log(`Book with ID: ${bookID} doesn't exist in DB`);
          result = `Book with ID: ${bookID} doesn't exist in DB`;
        } else {
          await doc
            .remove()
            .then(() => {
              console.log("Book with ID ${bookID} is deleted successfully");
              result = `Book with ID ${bookID} is deleted successfully`;
            })
            .catch((err) => (result = err));
        }
      })
      .catch((err) => (result = err));
  }
  return result;
};
module.exports = {
  printAllBooks,
  addBook,
  searchBook,
  removeBook,
  removeBookByID,
};
