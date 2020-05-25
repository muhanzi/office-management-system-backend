const signUpModal = require("../models/sign_up_model");

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

exports.showOne = function (id) {
  return signUpModal.findOne({ _id: id });
};
