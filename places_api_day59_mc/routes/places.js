const express = require("express");
const router = express.Router();
const placesController = require("../controllers/placesController");

router.get("/:slug", async (req, res) => {
  let result;
  await placesController
    .getPlacebySlug(req.params.slug)
    .then((data) => (result = data))
    .catch((err) => (result = err));
  res.send(result);
});
router.get("/filter/:nameOrCity", async (req, res) => {
  let result;
  await placesController
    .getPlacebyNameorCity(req.params.nameOrCity)
    .then((data) => (result = data))
    .catch((err) => (result = err));
  res.send(result);
});
router.post("/", async (req, res) => {
  console.log(req.body);
  let result;
  await placesController.addAPlace(req.body).then((data) => (result = data));
  res.send(result);
});
module.exports = router;