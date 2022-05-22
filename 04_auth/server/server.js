const express = require('express');
const models = require('./models');
// const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');
const cors = require('cors');
const {graphqlHTTP} = require('express-graphql');

// Create a new Express application
const app = express();

app.use(cors());

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://user:1q2w3e4r5t@cluster0-shard-00-00.tv7k8.mongodb.net:27017,cluster0-shard-00-01.tv7k8.mongodb.net:27017,cluster0-shard-00-02.tv7k8.mongodb.net:27017/auth?ssl=true&replicaSet=atlas-13e43y-shard-0&authSource=admin&retryWrites=true&w=majority';

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
}));

module.exports = app;
