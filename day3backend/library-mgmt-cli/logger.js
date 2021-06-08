const express = require("express");
const router = express.Router();

// router
//   .route("/")
//   .get((req, res) => res.send("List of books"))
//   .post((req, res) => res.send("Adding new book"));

// let bookHandler1 = (req, res, next) => {
//   let id = req.params.bookID;
//   if (Number(id !== NaN && Number(id) > 0)) {
//     next();
//   } else {
//     res.send("Invalid Book Id");
//   }
// };

// let booksHandler2 = (req, res) => {
//   res.send("Book requested: " + req.params.bookID);
// };

router.route("/").all((req, res, next) => {
    console.log(req.method + " / " + req.url);
    next();
});
module.exports = router;