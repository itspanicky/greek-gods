const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;

const EmblemSchema = new Schema({
    name: { type: String, required: true, unique: true },
    gods: { type: Array }
})

module.exports = mongoose.model("emblem", EmblemSchema)