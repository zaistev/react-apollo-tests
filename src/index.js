import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { LanguageList } from './LanguageList';


const API_URL = "https://countries.trevorblades.com/";

const client = new ApolloClient({
  link: createHttpLink({ uri: API_URL }),
  cache: new InMemoryCache({
    freezeResults: true
  }),
  assumeImmutableResults: true
});

const App = () => (
  <ApolloProvider client={client}>
    <LanguageList />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
