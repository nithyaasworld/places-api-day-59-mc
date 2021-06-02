const readLineSync = require('readline-sync');
const CategoryModel = require('../models/category');
const categoryController = require('./categoryController');
const BookModel = require('../models/book');

const printAllBooks = async() => {
    let books = await BookModel.find({});
    console.log('-------');
    books.forEach((book) => console.log('\n', book.title));
    console.log('-------');
}
const addBook = async (title, price, bookCategory, author) => {
    let category = await CategoryModel.findOne({ name: bookCategory });
    if (category) {
        const book = new Book({ title: title, price: price, category: category._id, author: author });
        await book.save().then((data)=> console.log("Following book has been added successfully:", data));
    } else {
        console.log("There is no such category. These are the available valid categories. Please try again with one of these.");
        await categoryController.printAllCategories();
    }
    // let bookAuthor = readLineSync.question("Who is the author? ");
    // const book = new Book({ title: bookTitle, price: bookPrice, category: bookCategory, author: bookAuthor });
    // await book.save();
}

const searchBook = async (title) => {
    let re = new RegExp(title, "i");
    await BookModel.find({ name: re }, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            console.log(docs);
        }
    })
}

// const removeCategory = async () => {
//     let response = readLineSync.question("What is the name of category, you want to delete? ");
//     let itemToDelete = await Category.findOne({ name: response });
//     if (itemToDelete === null) {
//         console.log('Category not found!');
//     } else {
//         await itemToDelete.remove();
//         console.log(`Category ${response} removed successfully`);
//     }
// }
module.exports = { printAllBooks, addBook, searchBook};