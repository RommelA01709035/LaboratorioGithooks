const express = require("express");
const controller = require("../controllers/userController");
const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.get("/", verifyToken, controller.getAll);
router.post("/", verifyToken, controller.create);
router.put("/:id", verifyToken, controller.update);
router.delete("/:id", verifyToken, controller.remove);

module.exports = router;
