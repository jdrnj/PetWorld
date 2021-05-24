const express = require("express");
const router = express.Router();

const login_controller = require("../Controllers/Login");

router.get("/:user", login_controller.login_user_get);

module.exports = router;
