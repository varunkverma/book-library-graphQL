const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./schema/schema");

const app = express();
mongoose.connect(
  `mongodb://varunkverma:7860@cluster0-shard-00-00-xik5x.mongodb.net:27017,cluster0-shard-00-01-xik5x.mongodb.net:27017,cluster0-shard-00-02-xik5x.mongodb.net:27017/book-library?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("MongoDB connected");
});

app.use("/graphql", graphqlHTTP({ graphiql: true, schema }));

const PORT = 4000;

app.listen(4000, () => console.log(`Server listening at port: ${PORT}`));
