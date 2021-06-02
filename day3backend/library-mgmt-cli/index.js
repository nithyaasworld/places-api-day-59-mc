const readLineSync = require('readline-sync');
const mongoose = require('mongoose');
const categoryController = require('./controllers/categoryController');
const bookController = require('./controllers/bookController');

let userName = readLineSync.question('What is your name? ');
console.log('Hi ' + userName + '!');

mongoose.connect('mongodb://127.0.0.1:27017/library', { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
    .then(()=> showOptions())
    .catch(err => console.log(err));

function displayOptions() {
    console.log("\nWelcome to McLaren Library");
    console.log("Here are few things you can do: ");
    console.log("1. See all categories");
    console.log("2. Add a new category");
    console.log("3. Delete a category");
    console.log("4. See all Books");
    console.log("5. Add new Book");
    console.log("6. Delete a Book");
    console.log("7. Search for a Book");
    console.log("8. Exit");
}
async function showOptions() {
    displayOptions();
    let userChoice = readLineSync.question("Pick an operation to perform (1-8): ");
    switch (userChoice) {
        case "1":
            await categoryController.printAllCategories();
            break;
        case "2":
            await categoryController.addCategory();
            break;
        case "3":
            await categoryController.removeCategory();
            break;
        case "4":
            await bookController.printAllBooks();
            break;
        case "5":
            let bookTitle = readLineSync.question("What is the name of the Book, you want to add? ");
            let bookPrice = readLineSync.question("What is the price? ");
            let bookCategory = readLineSync.question("What category does it belong to? ")
            let bookAuthor = readLineSync.question("Who is the author? (comma-separated) ").split(',');
            await bookController.addBook(bookTitle, bookPrice, bookCategory, bookAuthor);
            break;
        case '6':
            let bookToDelete = readLineSync.question("Enter the Name of the book you want to delete: ");
            await bookController.removeBook(bookToDelete);
            break;
        case '7':
            let searchTitle = readLineSync.question("What is the name of the Book, you want to search? ");
            await bookController.searchBook(searchTitle);
            break;
        default:
            mongoose.connection.close();
            return;
    }
    showOptions();
}