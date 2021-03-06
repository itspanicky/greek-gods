const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const RootQueryType = require("./root_query_type");
const mutations = require("./mutations");

// create GraphQL schema instance by handing `GraphQLSchema` a root query

// export to server.js for configuring the ExpressGraphQL middleware
module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: mutations
})