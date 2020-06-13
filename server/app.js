const express = require("express");
const graphqlHTTP = require("express-graphql");

const schema = require("./schema/schema");

const app = express();

app.use("/graphql", graphqlHTTP({ graphiql: true, schema }));

const PORT = 4000;

app.listen(4000, () => console.log(`Server listening at port: ${PORT}`));
