const express = require("express");
const router = express.Router();
const marketingController = require("../controllers/marketing_controller");
const verifyToken = require("../middleware/verifyAuthentication");

router.get("/showAll", marketingController.showAll);

router.get("/showOne/:id", verifyToken.verifyAuth, marketingController.showOne); // this route is protected

module.exports = router;
