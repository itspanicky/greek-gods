const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
const mongoose = require("mongoose");
const God = mongoose.model("god");
const GodType = require("./god_type");

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {}
});

module.exports = mutation;