require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// const logger = require('./logger');
// app.use(/.*/, logger);

//importing routes here
const bookRouter = require('./routes/books');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/categories');

//importing controllers
const bookController = require('./controllers/bookController');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.set('view engine', 'pug');
app.use(express.static('static'));
app.use(express.urlencoded());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("connected to mongoose"))
    .catch(err => console.log(err));

app.get('/', async (req, res) => {
    let books = await bookController.printAllBooks();
    console.log(books);
    res.render('index', {books: books})
})

let validateRequest = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    console.log(authHeader);
    if(!req.headers['authorization']){
        res.status(403).send('No Authorization provided');
        return;
    }
    if(req.headers['authorization'].length < 8){
        res.status(403).send('Token not provided');
        return;
    }
    try{
        let data = jwt.verify(authHeader.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
        console.log("jwt verification result: ", data);
        next();
    }catch(err){
        res.status(403).send("Invalid token provided");
    }
}

// app.use('/books', bookRouter);
app.use('/books', validateRequest, bookRouter);
app.use('/auth', authRouter);
app.use('/categories', categoryRouter);

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