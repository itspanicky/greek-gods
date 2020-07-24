const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const GodSchema = new Schema({
  name: { type: String, required: true, unique: true, },
  type: { type: String, required: true, },
  description: { type: String, required: true, },
  domains: [ { type: String, }, ],
  abode: { type: Schema.Types.ObjectId, ref: "abode", },
  emblems: [ { type: Schema.Types.ObjectId, ref: "emblem", }, ],
  parents: [ { type: Schema.Types.ObjectId, ref: "god", }, ],
  children: [ { type: Schema.Types.ObjectId, ref: "god", }, ],
  siblings: [ { type: Schema.Types.ObjectId, ref: "god", }, ],
});

// Static methods can be called anywhere in our app 
// where we have access to the God model
GodSchema.statics.findRelatives = function(godId, type) {
  return this.findById(godId)
    .populate(`${type}`)
    .then(god => god[type])
}

GodSchema.statics.addRelative = function(godId, relativeId, relationship) {
  return this.find({ 
    _id: { $in: [godId, relativeId] } 
  }).then(gods => {
    // $in allows us to query for multiple properties at once
    // and returns results as an array
    const god = godId === gods[0].id ? gods[0] : gods[1];
    const relative = relativeId === gods[0].id ? gods[0] : gods[1];

    switch (relationship) {
      case "parent":
        god.parents.push(relative);
        relative.children.push(god);
        break;
      case "child":
        god.children.push(relative);
        relative.parents.push(god);
        break;
      case "sibling":
        god.siblings.push(relative);
        relative.siblings.push(god);
        break;
    }

    return Promise.all([god.save(), relative.save()]).then(
      ([god, relative]) => god
    );
  })
}

GodSchema.statics.removeRelative = function(godId, relativeId, relationship) {
  return this.find({
    _id: { $in: [godId, relativeId] }
  }).then(gods => {
    const god = godId === gods[0].id ? gods[0] : gods[1];
    const relative = relativeId === gods[0].id ? gods[0] : gods[1];

    switch (relationship) {
      case "parent":
        god.parents.pull(relative);
        relative.children.pull(god);
        break;
      case "child":
        god.children.pull(relative);
        relative.parents.pull(god);
        break;
      case "sibling":
        god.siblings.pull(relative);
        relative.siblings.pull(god);
        break;
    }
  })
}

module.exports = mongoose.model("god", GodSchema);
