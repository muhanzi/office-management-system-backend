const express = require("express");
const router = express.Router();
const marketingController = require("../controllers/marketing_controller");

router.get("/showAll", marketingController.showAll);

router.get("/showOne/:id", marketingController.showOne);

module.exports = router;
