const service = require("../../../services/sign_up_service");
const bcrypt = require("bcrypt");

exports.addUser = async (user) => {
  // verify username
  let foundUsers = await service.verifyUserName(user.username);
  if (foundUsers.length > 0) {
    throw new Error("this user already exists");
  }
  let encryptedPassword = await bcrypt.hash(user.password, 10);
  user["password"] = encryptedPassword;
  const savedUser = await service.signUp(user);
  return savedUser;
};
