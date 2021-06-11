const mongoose = require("mongoose");
const express = require("express");
const app = express();
const morgan = require("morgan");

//routes
const pizzaRouter = require("./routes/pizza");
const orderItemRouter = require("./routes/orderItems");
const orderRouter = require("./routes/orders");

//middleware setup
app.use(morgan("dev"));
app.use(express.json());
app.use("/pizzas", pizzaRouter);
app.use("/orderItems", orderItemRouter);
app.use("/orders", orderRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/pizza", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongoose"))
  .catch((err) => console.log(err));

app.all(/.*/, (req, res) => {
  res.statusCode = 404;
  res.send("404 - Page not found");
});

const PORT = 8100;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
