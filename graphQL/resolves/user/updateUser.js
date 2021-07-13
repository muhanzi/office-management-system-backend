const service = require("../../../services/sign_up_service");
const bcrypt = require("bcrypt");

exports.updateUser = async (data) => {
  let encryptedPassword = await bcrypt.hash(data.password, 10);
  data["password"] = encryptedPassword;
  const updatedUser = await service.update({ user: data, id: data.id });
  return updatedUser;
};
