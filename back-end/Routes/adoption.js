const express = require("express");
const router = express.Router();

const adoption_controller = require("../Controllers/Adoption");

router.post("/new", adoption_controller.insert_adopter_post);
router.get("/get/all", adoption_controller.fetch_all_adopters_get);
router.delete("/confirm/:id", adoption_controller.confirm_adoption_delete);
module.exports = router;
