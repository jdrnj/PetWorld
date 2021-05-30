const express = require("express");
const router = express.Router();

const pet_controller = require("../Controllers/Pet");
router.post("/add", pet_controller.insert_pet_post);
router.get("/get/all", pet_controller.fetch_all_animals_get);
router.get("/get/by/filter", pet_controller.fetch_animals_by_filter_get);
router.get("/get/by/id/:id", pet_controller.fetch_animal_by_id);
router.get("/get/by/category", pet_controller.fetch_animals_by_category_get);
module.exports = router;
