const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', async (req, res) => {
    console.log(req.body);
    let result = await userController.addUser(req.body)
    console.log(result);
    if (result.status) {
        res.send(result.user);
    } else {
        res.status(401).send(result.err)
    }
})
module.exports = router;