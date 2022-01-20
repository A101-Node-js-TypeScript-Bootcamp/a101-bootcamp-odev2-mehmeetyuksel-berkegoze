const express = require("express");
const router = express.Router();
const brandController = require("../../controller/brandController")


router.get("/", brandController.getAllBrands);
router.get("/:name", brandController.getBrandByName);


module.exports = router;