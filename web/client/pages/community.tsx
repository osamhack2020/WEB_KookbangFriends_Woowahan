import React, { useEffect } from "react";
import Head from "next/head";
import Lee from "../lib/Lee";

import "../styles/pages/community.scss";

import CommunityNav from "../components/Community/CommunityNav/CommunityNav";
import CommunityBoard from "../components/Community/CommunityBoard/CommunityBoard";
import CommunityFriends from "../components/Community/CommunityFriends/CommunityFriends";
import CommunityViewFeed from "../components/Community/CommunityViewFeed/CommunityViewFeed";
import CommunityAddFeed from "../components/Community/CommunityAddFeed/CommunityAddFeed";

function Community({ query }) {
  useEffect(() => {
    Lee.loadingFinish();
  });

  return (
    <div id="Community">
      <Head>
        <title>국방프렌즈 - 커뮤니티</title>
      </Head>
      <div className="community__area parents">
        <div className="community__area__contents parents">
          <CommunityNav category={query.category} />
          {query.type === "list" && (
            <CommunityBoard category={query.category} />
          )}
          {query.type === "view" && <CommunityViewFeed id={query.id} />}
          {query.type === "add" && (
            <CommunityAddFeed category={query.category} />
          )}
          <CommunityFriends />
        </div>
      </div>
    </div>
  );
}

Community.getInitialProps = ({ query }) => {
  return { query };
};

export default Community;
