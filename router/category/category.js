const express = require("express");
const router = express.Router();

const categoryController = require("../../controller/Category")


router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getSingleCategory);

module.exports = router;