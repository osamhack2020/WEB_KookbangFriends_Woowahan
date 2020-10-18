import React from "react";
import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import DelayLink from "../../../lib/DelayLink";
import Lee from "../../../lib/Lee";

import "./HomeTimeLine.scss";

import HomeTimeLineBox from "./HomeTimeLineBox/HomeTimeLineBox";

const TIMELINE_QUERY = gql`
  query {
    feeds(sort: "date:desc", limit: 8) {
      id
      title
      description
      date
      type
      thumbnail {
        url
      }
      user {
        username
        thumbnail {
          url
        }
        avatar
      }
      user_likes {
        username
      }
    }
  }
`;

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  769: 2,
  360: 1,
};

const HomeTimeLine = () => {
  let feeds;

  const { data, loading, error } = useQuery(TIMELINE_QUERY, {
    ssr: true,
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
    <div id="HomeTimeLine">
      <div className="home-time-line__area parents">
        <div className="home-time-line__area__contents parents">
          <div className="home-time-line__area__contents__subject">
            <div className="home-time-line__area__contents__subject__title">
              <DelayLink
                to={`community?type=list&category=전체게시글`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <span>커뮤니티</span>
              </DelayLink>
            </div>
          </div>
          <ul className="home-time-line__area__contents__lists">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {feeds.map((feed, index) => {
                return (
                  <HomeTimeLineBox
                    key={`feed-${index}`}
                    id={feed.id}
                    title={feed.title}
                    thumbnail={feed.thumbnail}
                    date={feed.date}
                    user={feed.user}
                    description={feed.description}
                    type={feed.type}
                    likes={feed.user_likes.length}
                  />
                );
              })}
            </Masonry>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeTimeLine;
