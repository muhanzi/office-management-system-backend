const moongoose = require("mongoose");
const schema = moongoose.Schema;
const marketingSchema = new schema({
  name: {
    type: String,
    required: [true, "name is required // this shows if name is not given"],
    min: 3,
    max: 40,
  },
  age: {
    type: Number,
    required: [false, "age is not required"],
  },
  available: {
    type: Boolean,
    default: false,
  },
  course: String,
});

const marketingModal = moongoose.model("marketing", marketingSchema);
module.exports = marketingModal;
