const express = require("express");
const router = express.Router();

const category_controller = require("../Controllers/Category");
router.get("/get", category_controller.get_categories_get);
router.post("/add", category_controller.insert_category_post);
module.exports = router;
