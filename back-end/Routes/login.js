const express = require("express");
const router = express.Router();

const login_controller = require("../Controllers/Login");
router.post("/user", login_controller.login_user_post);

module.exports = router;
