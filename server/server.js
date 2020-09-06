const express = require("express");
const models = require("./models");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
const schema = require("./schema/schema");
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
const path = require("path");
const app = express();


if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));
  
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(express.static("public"));
app.use(webpackMiddleware(webpack(webpackConfig)));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client", "index.html"));
});

// if (process.env.NODE_ENV === "production") {
//   const publicPath = path.join(__dirname, "../public");
//   app.use(express.static(publicPath));
//   app.use("*", express.static(publicPath));
// }

module.exports = app;
