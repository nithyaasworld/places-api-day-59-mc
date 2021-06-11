const PizzaModel = require("../models/pizza");

const getAllPizzas = async () => {
  let pizzas = await PizzaModel.find({});
  return pizzas;
};

const addAPizza = async ({ name, price, ingredients }) => {
  const pizza = new PizzaModel({
    name,
    price,
    ingredients,
  });
  let result;
  await pizza
    .save()
    .then((data) => {
      result = {
        status: true,
        response: `Following data has been added successfully: ${data}`,
      };
    })
    .catch((err) => {
      result = { status: false, response: err };
    });
  return result;
};
module.exports = { getAllPizzas, addAPizza };
