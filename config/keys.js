require("dotenv").config();

module.exports = {
  MONGO_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@graphql-1jras.mongodb.net/greek-gods?retryWrites=true&w=majority`,
};