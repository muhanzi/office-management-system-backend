const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/sign_up_controller");

router.post("/", signUpController.signUp);

router.put("/update/:id", signUpController.update);

router.delete("/delete/:id", signUpController.delete);

module.exports = router;
