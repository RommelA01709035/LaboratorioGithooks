const express = require("express");
const controller = require("../controllers/animalController");
const verifyToken = require("../../jwt-test-app/utils/verifyToken");

const router = express.Router();

router.get("/", verifyToken, controller.listAll);
router.get("/species/:species", verifyToken, controller.findBySpecies);
router.post("/", verifyToken, controller.create);
router.put("/:id", verifyToken, controller.update);
router.delete("/:id", verifyToken, controller.remove);

module.exports = router;
