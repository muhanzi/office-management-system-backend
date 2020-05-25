const moongoose = require("mongoose");
const schema = moongoose.Schema;
const signUpSchema = new schema({
  username: {
    type: String,
    required: [true, "name is required"],
    min: 3,
    max: 40,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    min: 4,
    max: 8,
  },
  department: { type: String },
  role: { type: String },
});

const signUpModal = moongoose.model("users", signUpSchema); // "users" --> collection name
module.exports = signUpModal;
