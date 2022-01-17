const express = require("express");
let router = express.Router();

const user = require("./user/user");
const brand = require("./brand/brand");
const categoryEndpoint = require("./category/category");

router.use('/login', user);
router.use('/brand', brand);
router.use('/category', categoryEndpoint);


module.exports = router;