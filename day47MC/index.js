const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const pizzaController = require('./controllers/pizzaController');


//importing routes
const pizzaRouter = require('./routes/pizza');
const orderRouter = require('./routes/order');

//middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use('/pizzas', pizzaRouter);

mongoose.connect('mongodb://127.0.0.1:27017/pizza', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("connected to mongoose"))
    .catch(err => console.log(err));

app.get('/', async (req, res) => {
        let pizza = await pizzaController.getAllPizzas();
        console.log(pizza);
        res.send(pizza);
    })
    
    app.all(/.*/, (req, res) => {
        res.statusCode = 404;
        res.send('404 - Page not found');
    })
    
    const PORT = 8100;
    app.listen(PORT, () => {
        console.log(`Server is listening at port ${PORT}`);
    })