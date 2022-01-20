const express = require("express");
let router = express.Router();

const user = require("./user/user");
const brand = require("./brand/brand");
const category = require("./category/category");


router.use('/login', user);
router.use('/brand', brand);
router.use('/category', category);



module.exports = router;