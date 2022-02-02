import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://crm.pro.xinixgroup.com/v1/graphql",
    headers: {
      "x-hasura-admin-secret":
        "tpueGiDq76IoRQLtNfE0v7tcU2htazAPAYJljCSU2WN5e2hcrHpWiymjXxkPXtJ1"
    },
  }),
  cache: new InMemoryCache()
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
