const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", async (req, res) => {
  let result;
  await orderController
    .getAllOrders()
    .then((data) => result = data)
    .catch((err) => resul = err);
  res.send(result);
});
router.get("/:id", async (req, res) => {
  let result;
  await orderController
    .getOrdersByID(req.params.id)
    .then((data) => result=data)
    .catch((err) => result=err);
  res.send(result);
});
router.post("/", async (req, res) => {
  console.log(req.body);
  let result;
  await orderController
    .addAnOrder(req.body)
    .then((data) => (result = data))
    .catch((err) => result = err);
  res.send(result);
});
module.exports = router;