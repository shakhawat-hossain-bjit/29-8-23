const express = require("express");
const {
  fetchAll,
  deleteOne,
  findById,
  postData,
  updateData,
} = require("../controllers/products.controller");
const router = express.Router();

router.get("/", fetchAll);
router.get("/find-by-id/:id", findById);
router.delete("/delete/:id", deleteOne);
router.post("/insert", postData);
router.patch("/update/:id", updateData);

module.exports = router;
