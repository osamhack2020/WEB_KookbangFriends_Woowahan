import React from "react";
import NextApp from "next/app";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
import dynamic from "next/dynamic";

import "../styles/styles.scss";

const Header = dynamic(import("../components/Layouts/Header/Header"), {
  ssr: false,
});

const Footer = dynamic(import("../components/Layouts/Footer/Footer"), {
  ssr: false,
});

const Right = dynamic(import("../components/Layouts/Right/Right"), {
  ssr: false,
});

class App extends NextApp<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Header />
        <div id="content">
          <Component {...pageProps} />
        </div>
        <Right />
        <Footer />
      </ApolloProvider>
    );
  }
}

export default withApollo(App);
