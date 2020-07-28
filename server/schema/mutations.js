const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
const mongoose = require("mongoose");
const God = mongoose.model("god");
const GodType = require("./god_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newGod: {
      type: GodType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, { name, type, description }) {
        return new God({ name, type, description }).save();
      },
    },
    deleteGod: {
      type: GodType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, { id }) {
        return God.findByIdAndDelete({ _id: id });
      },
    },
    updateGod: {
      type: GodType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, { id, name, type, description }) {
        const updateObj = {};
        if (name) updateObj.name = name;
        if (type) updateObj.type = type;
        if (description) updateObj.description = description;

        return God.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { $new: true },
          (err, god) => {
            return god;
          }
        );
      }
    },
    addGodRelative: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        relativeId: { type: GraphQLID },
        relationship: { type: GraphQLString },
      },
      resolve(parentValue, { godId, relativeId, relationship }) {
        return God.addRelative(godId, relativeId, relationship);
      }
    },
    removeGodRelative: {
        type: GodType,
        args: {
            godId: { type: GraphQLID },
            relativeId: { type: GraphQLID },
        },
        resolve(parentValue, { godId, relativeId, relationship }) {
            return God.removeRelative(godId, relativeId, relationship);
        }
    }
  },
});

module.exports = mutation;