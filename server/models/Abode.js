const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const AbodeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  coordinates: { type: String },
  gods: { type: Array }
});

module.exports = mongoose.model("abode", AbodeSchema);
