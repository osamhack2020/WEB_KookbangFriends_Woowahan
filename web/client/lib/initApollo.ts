import ApolloClient from "apollo-client";
import { NormalizedCacheObject, InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import Cookies from "js-cookie";

import { isBrowser } from "./isBrowser";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

function create(initialState: any) {
  const httpLink = createUploadLink({
    uri: "https://api.kookbang.kr/graphql",
    credentials: "include",
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        if (
          isBrowser &&
          message.includes(
            "Access denied! You need to be authorized to perform this action!"
          )
        ) {
          Router.replace("/users/login");
        }
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get("jwt");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
