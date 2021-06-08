const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
// const logger = require('./logger');
// app.use(/.*/, logger);

//importing routes here
const bookRouter = require('./routes/books');

//importing controllers
const bookController = require('./controllers/bookController');

app.use(morgan('dev'));
app.set('view engine', 'pug');
app.use(express.static('static'));
app.use(express.urlencoded());
app.use('/books', bookRouter);

mongoose.connect('mongodb://127.0.0.1:27017/library', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("connected to mongoose"))
    .catch(err => console.log(err));

app.get('/', async (req, res) => {
    let books = await bookController.printAllBooks();
    console.log(books);
    res.render('index', {books: books})
})

app.all(/.*/, (req, res) => {
    res.statusCode = 404;
    res.send('404 - Page not found');
})

const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})
// app.get('/books', (req,res) =>{
//     res.send("List of books");
// })
// app.get('/books/:bookID', (req, res) => {
//     console.log(req.params);
//     res.send('Book requested: ' + req.params.bookID);
// })