const express = require("express");
const router = express.Router();
const orderItemsController = require("../controllers/orderItemsController");

router.get("/", async (req, res) => {
  let result;
  await orderItemsController
    .getAllOrderItems()
    .then((data) => result = data)
    .catch((err) => resul = err);
  res.send(result);
});
router.get("/:id", async (req, res) => {
  let result;
  await orderItemsController
    .getOrderItemsByID(req.params.id)
    .then((data) => result=data)
    .catch((err) => result=data);
  res.send(result);
});
router.post("/", async (req, res) => {
  console.log(req.body);
  let result;
  await orderItemsController
    .addAnOrderItem(req.body)
    .then((data) => (result = data));
  res.send(result);
});
module.exports = router;