const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
app.use('/graphql', graphqlHTTP({
    graphiql: true, schema
}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server run'));