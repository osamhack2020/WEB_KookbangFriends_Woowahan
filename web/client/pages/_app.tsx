import React from "react";
import NextApp from "next/app";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";

import "../styles/styles.scss";

class App extends NextApp<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <div id="content">
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
    );
  }
}

export default withApollo(App);
