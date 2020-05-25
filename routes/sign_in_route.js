const express = require("express");
const router = express.Router();
const signInController = require("../controllers/sign_in_controller");

router.post("/", signInController.signIn);

module.exports = router;
