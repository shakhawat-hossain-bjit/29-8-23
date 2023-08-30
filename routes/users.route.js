const express = require("express");
const userController = require("../controllers/users.controller");
const router = express.Router();

// router.get("/all", orderController.fetchAll);
router.get("/get-my-orders/:id", userController.findOrdersOfUser);
// router.delete("/delete/:id", ProductController.deleteOne);

// router.post("/insert", productValidator, ProductController.postData);
// router.patch("/update/:id", ProductController.updateData);

module.exports = router;
