const service = require("../../../services/sign_in_service");

exports.showUser = async (username) => {
  try {
    let user = await service.getUser(username);
    return {
      id: user._id,
      username: user.username,
      department: user.department,
      role: user.role,
      password: user.password,
    };
  } catch (error) {
    return Error("user does not exist. " + error.message);
  }
};

exports.showAllUsers = async () => {
  let users = await service.getAllUsers();
  return users;
};
