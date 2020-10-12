import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Head from "next/head";
import Lee from "../lib/Lee";
import Cookies from "js-cookie";
import Router from "next/router";

import "../styles/pages/myPage.scss";

import MyPageInfo from "../components/MyPage/MyPageInfo/MyPageInfo";
import MyPageConsulting from "../components/MyPage/MyPageConsulting/MyPageConsulting";
import MyPageViewConsulting from "../components/MyPage/MyPageViewConsulting/MyPageViewConsulting";
import MyPageFeed from "../components/MyPage/MyPageFeed/MyPageFeed";

const USER_QUERY = gql`
  query {
    me {
      user {
        role {
          name
        }
        username
        thumbnail {
          url
        }
        avatar
      }
    }
  }
`;

function MyPage({ query }) {
  let [login, setLogin] = useState(false);

  useEffect(() => {
    if (Cookies.get("username") && Cookies.get("jwt")) {
      setLogin(true);
    } else {
      Router.push(`/`);
    }
  });

  let me;

  const { data, loading, error } = useQuery(USER_QUERY, {
    ssr: false,
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
    if (data.me.user.role.name !== "Professional") {
      if (query.ver === "professional") {
        Router.push(`/`);
      } else {
        me = data.me;
        Lee.loadingFinish();
      }
    } else {
      me = data.me;
      Lee.loadingFinish();
    }
  }

  return (
    <div id="MyPage">
      <Head>
        <title>국방프렌즈 - 마이페이지</title>
      </Head>
      {login && me && (
        <div className="my-page__area parents">
          <div className="my-page__area__contents parents">
            <MyPageInfo user={me.user} ver={query.ver} />
            {query.type === "consulting" && (
              <MyPageConsulting id={me.user.id} ver={query.ver} />
            )}
            {query.type === "viewConsulting" && (
              <MyPageViewConsulting id={query.id} ver={query.ver} />
            )}
            {query.type === "feed" && <MyPageFeed />}
          </div>
        </div>
      )}
    </div>
  );
}

MyPage.getInitialProps = ({ query }) => {
  return { query };
};

export default MyPage;
