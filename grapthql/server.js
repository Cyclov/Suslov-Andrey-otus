const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
let port = 3000;


const schema = require('./schema.js');
const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);