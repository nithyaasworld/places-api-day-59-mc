const readLineSync = require('readline-sync');
const mongoose = require('mongoose');
const categoryController = require('./controllers/categoryController');
const bookController = require('./controllers/bookController');
const memberController = require('./controllers/memberController');
const issueController = require('./controllers/issueController');

let userName = readLineSync.question('What is your name? ');
console.log('Hi ' + userName + '!');

mongoose.connect('mongodb://127.0.0.1:27017/library', { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
    .then(()=> showOptions())
    .catch(err => console.log(err));

function displayOptions() {
    console.log("\nWelcome to McLaren Library\n");
    console.log("Here are few things you can do: \n");
    console.log("----Categories----");
    console.log("1. See all categories");
    console.log("2. Add a new category");
    console.log("3. Delete a category\n");
    console.log("----Books----");
    console.log("4. See all Books");
    console.log("5. Add new Book");
    console.log("6. Delete a Book");
    console.log("7. Search for a Book");
    console.log("8. Get all book of a category\n");
    console.log("----Members----");
    console.log("9. Add a member");
    console.log("10. List all members");
    console.log("11. Delete a member\n");
    console.log("----Issues----");
    console.log("12: Add an issue");
    console.log("13. Print all issues");
    console.log("14. Delete an issue using Member ID\n");
    console.log("----To exit----");
    console.log("15. Exit");
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
        case '8':
            let categoryName = readLineSync.question("Enter the name of the category: ");
            await categoryController.showBooksOfACategory(categoryName);
            break;
        case '9':
            let memberName = readLineSync.question("Enter the name of the member you want to add: ");
            await memberController.addAMember(memberName);
            break;
        case '10':
            await memberController.printAllMembers();
            break;
        case '11':
            let memberToDelete = readLineSync.question("Enter the Id of the member you want to delete: ");
            await memberController.deleteAMember(memberToDelete);
            break;
        case '12': {
            let bookName = readLineSync.question("Enter the name of the book you want to issue: ");
            let memberId = readLineSync.question("Enter the ID of the member you want to issue the book to: ");
            await issueController.addAnIssue(Number(memberId), bookName);
            break;
        }
        case '13': {
            await issueController.printAllIssues();
            break;
        }
        case '14': {
            let memberID = readLineSync.question("Enter the MemberID whose issue you want to cancel:");
            await issueController.deleteUsingMemberID(Number(memberID));
            break;
        }
        default:
            mongoose.connection.close();
            return;
    }
    showOptions();
}