const { failure } = require("../util/common");

const productValidator = (req, res, next) => {
  let error = {};
  if (newProduct.hasOwnProperty("id")) {
    error.id = "Id should not be passed in body";
  }
  if (
    !newProduct.hasOwnProperty("title") ||
    newProduct?.title?.toString().trim() == ""
  ) {
    error.title =
      "title should be passed to create a product and it must have some values";
  }

  if (!newProduct.hasOwnProperty("price") || isNaN(newProduct.price)) {
    error.price =
      "price should  be passed to create a product and it must be number type";
  }
  if (
    !newProduct.hasOwnProperty("stock") ||
    isNaN(newProduct.stock) ||
    !Number.isInteger(Number(newProduct.stock))
  ) {
    error.stock =
      "stock should  be passed to create a product and it must be integer type";
  }

  if (newProduct.hasOwnProperty("rating")) {
    // console.log(newProduct?.rating);
    // console.log("second ", newProduct?.rating);
    if (
      isNaN(newProduct.rating) ||
      newProduct.rating < 0 ||
      newProduct.rating > 5
    ) {
      error.rating = "rating should be in range 0.00~5.00";
    }
  }

  req.error = error;
  next();
};

module.exports = createValidation;
