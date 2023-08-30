const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
const productRouter = require("./routes/products.route");
const userRouter = require("./routes/users.route");
const orderRouter = require("./routes/orders.route");
const { failure, success } = require("./utils/common");
dotenv.config();

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.log(err);
    return res.status(400).send(failure("Invalid JSON provided"));
  }
  next();
});

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.get("/", (req, res) => {
  return res.status(200).send(success("Hello world"));
});
app.use("*", (req, res) => {
  return res.status(400).send(failure("There is no such route"));
});

app.listen(8000, () => {
  //   console.log(process.env.MY_SECRET_KEY);
  let date = new Date();
  console.log(
    `App is running on port 8000 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
  );
});
