const express = require("express");
const ProductController = require("../controllers/products.controller");
const Validator = require("../middleware/validator");
const expressValidator = require("../middleware/expressValidator");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/all", ProductController.fetchAll);
router.get("/find-by-id/:id", verifyToken, ProductController.findById);
router.delete("/delete/:id", ProductController.deleteOne);

// router.post("/insert", Validator.productValidator, ProductController.postData);
router.post("/insert", expressValidator.create, ProductController.postData);
router.patch("/update/:id", verifyToken, ProductController.updateData);

module.exports = router;
