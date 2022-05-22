import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { setContext } from '@apollo/client/link/context';

import App from './components/App';
import Home from './components/Home';
import Auth from './components/Auth';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


ReactDOM.render(
  <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/auth/:action" component={Auth} />
        </Route>
      </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
