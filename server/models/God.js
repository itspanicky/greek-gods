const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
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

    return Promise.all([god.save(), relative.save()]).then(
      ([god, relative]) => god
    );
  })
}

GodSchema.statics.updateAbode = function(godId, abodeId) {
  const God = mongoose.model("god");
  const Abode = mongoose.model("abode");

  return God.findById(godId).then(god => {
    if (god.abode) {
      Abode.findById(abodeId).then(oldAbode => {
        oldAbode.gods.pull(god);
        return oldAbode.save();
      })
    }

    return Abode.findById(abodeId).then(newAbode => {
      god.abode = newAbode
      newAbode.gods.push(god);

      return Promise.all([god.save(), newAbode.save()]).then(
        ([god, newAbode]) => god
      );
    })
  })
}

GodSchema.statics.addDomain = function(godId, domain) {
  return this.findById(godId).then(god => {
    god.domains.push(domain);
    return god.save().then(god => god);
  })
}

GodSchema.statics.removeDomain = function(godId, domain) {
  return this.findById(godId).then(god => {
    god.domains.forEach((godDomain, i) => {
      if (godDomain === domain) god.domains.splice(i, 1);
    })
    return god.save().then(god => god);
  })
}

module.exports = mongoose.model("god", GodSchema);
