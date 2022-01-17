const express = require("express");
let router = express.Router();

const user = require("./user/user");
const brand = require("./brand/brand");

router.use('/login', user);
router.use('/brand', brand);

module.exports = router;