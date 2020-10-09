import React, { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import Lee from "../lib/Lee";
import Cookies from "js-cookie";

import "../styles/pages/postSupport.scss";

import PostSupportMenu from "../components/PostSupport/PostSupportMenu/PostSupportMenu";
import PostSupportBoard from "../components/PostSupport/PostSupportBoard/PostSupportBoard";

function PostSupport({ query }) {
  let [login, setLogin] = useState(false);

  useEffect(() => {
    if (Cookies.get("username") && Cookies.get("jwt")) {
      setLogin(true);

      if (query.type === "건의사항" || query.type === "문의사항") {
        Lee.loadingFinish();
      } else {
        Router.push("support?type=공지사항");
      }
    } else {
      setLogin(false);
      Router.push("support?type=공지사항");
    }
  });

  return (
    <div id="PostSupport">
      <Head>
        <title>국방프렌즈 - 체계지원</title>
      </Head>
      {login && (
        <div className="post-support__area">
          <div className="post-support__area__contents">
            <PostSupportMenu type={query.type} />
            <PostSupportBoard
              type={query.type}
              login={login}
              user={Cookies.get("username")}
            />
          </div>
        </div>
      )}
    </div>
  );
}

PostSupport.getInitialProps = ({ query }) => {
  return { query };
};

export default PostSupport;
