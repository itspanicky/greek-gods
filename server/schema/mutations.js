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
        }
      },
      deleteGod: {
          type: GodType,
          args: {
              id: { type: GraphQLID }
          },
          resolve(parentValue, { id }) {
              return God.findByIdAndDelete({ _id: id });
          }
      }
    }
});

module.exports = mutation;