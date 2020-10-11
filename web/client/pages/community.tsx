import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";

import "../styles/pages/community.scss";

import CommunityNav from "../components/Community/CommunityNav/CommunityNav";
import CommunityBoard from "../components/Community/CommunityBoard/CommunityBoard";
import CommunityFriends from "../components/Community/CommunityFriends/CommunityFriends";

function Community({ query }) {
  let FEED_QUERY;

  if (query.type === "전체게시글") {
    FEED_QUERY = gql`
      query {
        feeds {
          title
          thumbnail {
            url
          }
          date
          user {
            username
            thumbnail {
              url
            }
          }
          type
          paragraph
        }
      }
    `;
  } else {
    FEED_QUERY = gql`
      query($type: String!) {
        feeds(where: { type: $type }) {
          title
          thumbnail {
            url
          }
          date
          user {
            username
            thumbnail {
              url
            }
          }
          type
          paragraph
        }
      }
    `;
  }

  useEffect(() => {
    Lee.loadingFinish();
  });

  let feeds;

  const { data, loading, error } = useQuery(FEED_QUERY, {
    ssr: true,
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
    feeds = data.feeds;
  }

  return (
    <div id="Community">
      <Head>
        <title>국방프렌즈 - 커뮤니티</title>
      </Head>
      <div className="community__area parents">
        <div className="community__area__contents parents">
          <CommunityNav type={query.type} />
          <CommunityBoard type={query.type} feeds={feeds} />
          <CommunityFriends type={query.type} />
        </div>
      </div>
    </div>
  );
}

Community.getInitialProps = ({ query }) => {
  return { query };
};

export default Community;
