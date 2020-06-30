const signUpModal = require("../models/sign_up_model");

exports.verifyUserName = function (username) {
  return signUpModal.find({ username: username }); // find()  returns a promise with a resolved response that contains an array of Documents that have that username
};

exports.signUp = function (user) {
  return signUpModal.create(user);
};

exports.update = function (data) {
  const { user, id } = data;
  return signUpModal.findByIdAndUpdate({ _id: id }, user);
};

exports.delete = function (id) {
  return signUpModal.findByIdAndDelete({ _id: id });
};

exports.deleteByUsername = function (username) {
  return signUpModal.findOneAndDelete({ username: username }); // delete the matching document
};

exports.showOne = function (id) {
  return signUpModal.findOne({ _id: id });
};
