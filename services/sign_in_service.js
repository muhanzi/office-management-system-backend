const signUpModal = require("../models/sign_up_model");

exports.signIn = function (username) {
  return signUpModal.findOne({ username: username });
};

exports.getUser = function (username) {
  return signUpModal.findOne({ username: username });
};

exports.getAllUsers = function () {
  return signUpModal.find();
};
