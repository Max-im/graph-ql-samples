const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const rootValue = require('./rootValue');

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue
}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server run'));