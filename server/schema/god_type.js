const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const GodType = new GraphQLObjectType({
    name: "GodType",
    fields: () => ({ // create thunk
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString },
        domains: { type: new GraphQLList(GraphQLString) } // returns array of domains
    })
});

module.exports = GodType;