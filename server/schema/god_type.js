const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const Abode = mongoose.model("abode");
const AbodeType = require("./abode_type");
const Emblem = mongoose.model("emblem");
const EmblemType = require("./emblem_type");

const GodType = new GraphQLObjectType({
    name: "GodType",
    fields: () => ({ // create thunk
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString },
        domains: { type: new GraphQLList(GraphQLString) }, // returns array of domains
        abode: {
            type: AbodeType,
            resolve(parentValue) {
                return Abode.findById(parentValue.abode)
                    .then(abode => abode)
                    .catch(err => null)
            }
        },
        emblems: {
            type: new GraphQLList(EmblemType),
            resolve(parentValue) {
                return GodType.findById(parentValue.id)
                    .populate("emblems")
                    .then(god => god.emblems)
            }
        }
    })
});

module.exports = GodType;