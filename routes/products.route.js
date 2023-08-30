const express = require("express");
const ProductController = require("../controllers/products.controller");
const productValidator = require("../middleware/validator");
const router = express.Router();

router.get("/all", ProductController.fetchAll);
router.get("/find-by-id/:id", ProductController.findById);
router.delete("/delete/:id", ProductController.deleteOne);

router.post("/insert", productValidator, ProductController.postData);
router.patch("/update/:id", ProductController.updateData);

module.exports = router;
