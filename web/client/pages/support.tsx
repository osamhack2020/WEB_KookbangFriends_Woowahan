import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Head from "next/head";
import Lee from "../lib/Lee";
import Cookies from "js-cookie";

import "../styles/pages/support.scss";

import SupportBoard from "../components/Support/SupportBoard/SupportBoard";
import SupportMenu from "../components/Support/SupportMenu/SupportMenu";

const SUPPORT_QUERY = gql`
  query($type: String!) {
    supports(where: { type: $type }, sort: "date:desc") {
      id
      title
      date
      type
      user {
        username
        thumbnail {
          url
        }
        avatar
      }
    }
  }
`;

function Support({ query }) {
  let [login, setLogin] = useState(false);

  useEffect(() => {
    if (
      query.type === "공지사항" ||
      query.type === "건의사항" ||
      query.type === "문의사항" ||
      query.type === "자주묻는질문"
    ) {
      Lee.loadingFinish();
    } else {
      Router.push("support?type=공지사항");
    }

    if (Cookies.get("username") && Cookies.get("jwt")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  let supports;

  const { data, loading, error } = useQuery(SUPPORT_QUERY, {
    ssr: false,
    variables: { type: query.type },
  });

  if (loading) {
    return null;
  }

  if (error) {
    if (JSON.stringify(error.graphQLErrors[0].message) === '"Forbidden"') {
      return <p>권한이 없습니다.</p>;
    } else {
      return <p>Error: {JSON.stringify(error)}</p>;
    }
  }

  if (data) {
    supports = data.supports;
  }

  return (
    <div id="Support">
      <Head>
        <title>국방프렌즈 - 체계지원</title>
      </Head>
      <div className="support__area">
        <div className="support__area__contents">
          <SupportMenu type={query.type} />
          <SupportBoard
            subject={query.type}
            supports={supports}
            login={login}
          />
        </div>
      </div>
    </div>
  );
}

Support.getInitialProps = ({ query }) => {
  return { query };
};

export default Support;
