const express = require("express");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
const router = require("./routes/products.route");
dotenv.config();

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use((err, req, res, next) => {
  next();
});

app.use("/products", router);

app.listen(8000, () => {
  //   console.log(process.env.MY_SECRET_KEY);
  let date = new Date();
  console.log(
    `App is running on port 8000 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
  );
});
