const express = require("express");
const router = express.Router();

const register_controller = require("../Controllers/Register");

router.post("/new", register_controller.insert_register_post);

module.exports = router;
