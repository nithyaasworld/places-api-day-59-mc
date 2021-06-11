const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

router.get('/', async (req, res) => {
    let result;
    
    await pizzaController.getAllPizzas().then((data) => result = { status: true, response: data })
        .catch((err) => result = { status: false, response: err });
    
    res.send(result);
})

// router.post('/pizza', async (req,res) => {
//     console.log(req);
// })
module.exports = router;