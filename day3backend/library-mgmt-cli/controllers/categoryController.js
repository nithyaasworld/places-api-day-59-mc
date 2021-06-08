const Category = require('../models/category');
const readLineSync = require('readline-sync');
const BookModel = require('../models/book');
const greenColor = "\x1b[32m";
const resetColor = "\x1b[0m";

const printAllCategories = async () => {
    let categories = await Category.find();
    return categories;
    // console.log('-------');
    // categories.forEach((category) => console.log(greenColor + category.name + resetColor));
    // console.log('-------');
}

const addCategory = async () => {
    let response = readLineSync.question("What is the name of category, you want to add? ");
    const category = new Category({ name: response });
    await category.save().then((data)=> console.log(greenColor + "Category " + response + " added successfully with an id of: " + data._id + resetColor)).catch((err)=> console.log(err));
}

const removeCategory = async () => {
    let response = readLineSync.question("What is the name of category, you want to delete? ");
    let itemToDelete = await Category.findOne({ name: response });
    if (itemToDelete === null) {
        console.log(greenColor + '\nCategory not found!' + resetColor);
    } else {
        await itemToDelete.remove();
        console.log(greenColor + `\nCategory ${response} removed successfully` + resetColor);
    }
}
const showBooksOfACategory = async (categoryName) => {
    let catID = await Category.findOne({ name: categoryName });
    if (catID) {
        await BookModel.find({ category: catID._id }).then((data) => {
            if (data && data.length > 0) {
                data.forEach((book) => console.log(book.title));
            } else {
                console.log(greenColor + "There is no book exists for that category" + resetColor);
            }
        })
    } else {
        console.log(greenColor + "There is no such category" + resetColor);
    }
}
module.exports = { printAllCategories, addCategory, removeCategory, showBooksOfACategory };