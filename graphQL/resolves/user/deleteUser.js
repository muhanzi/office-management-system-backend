const service = require("../../../services/sign_up_service");

exports.deleteUser = async (id) => {
  const response = await service.delete(id);
  if (response === null) {
    throw new Error("Failed to delete this user");
  }
  return response;
};
