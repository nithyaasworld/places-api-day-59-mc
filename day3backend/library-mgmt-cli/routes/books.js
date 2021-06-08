const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const bookController = require('../controllers/bookController');
// const express = require('express');
// const app = express();
// app.use(express.static('static'));

router
  .route("/")
  .get((req, res) => res.send("List of books"))
  .post((req, res) => res.send("Adding new book"));

let bookHandler1 = (req, res, next) => {
  let id = req.params.bookID;
  if (Number(id !== NaN && Number(id) > 0)) {
    next();
  } else {
    res.send("Invalid Book Id");
  }
};
let booksHandler2 = (req, res) => {
  res.send("Book requested: " + req.params.bookID);
};

router.get('/add-new', async (req, res) => {
  let categories = await categoryController.printAllCategories();
  let catArr = [];
  if (categories.length > 0) {
    categories.forEach(cat => {
      catArr.push(cat.name);
    });
  }
  res.render('addNew',{categories: catArr});
})
router.post('/add-new', async (req, res) => {
  console.log('request is: ', req.body);
  let title = req.body.inputBookTitle;
  let price = req.body.inputBookPrice;
  let bookCategory = req.body.inputCategory;
  let author = req.body.inputAuthors;
  await bookController.addBook(title, price, bookCategory, author);
  res.redirect('/');
})

router.get("/:bookID", [bookHandler1, booksHandler2]);
module.exports = router;