const Category = require('../models/category');
const readLineSync = require('readline-sync');

const printAllCategories = async () => {
    console.log('inside print all categories');
    let categories = await Category.find();
    console.log('-------');
    categories.forEach((category) => console.log('\n', category.name));
    console.log('-------');
}

const addCategory = async () => {
    let response = readLineSync.question("What is the name of category, you want to add? ");
    const category = new Category({ name: response });
    await category.save();
}

const removeCategory = async () => {
    let response = readLineSync.question("What is the name of category, you want to delete? ");
    let itemToDelete = await Category.findOne({ name: response });
    if (itemToDelete === null) {
        console.log('Category not found!');
    } else {
        await itemToDelete.remove();
        console.log(`Category ${response} removed successfully`);
    }
}
module.exports = { printAllCategories, addCategory, removeCategory };