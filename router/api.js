const express = require("express");
const router = express.Router();
const user = require("./user/user")

router.route("/login", user)