import React from "react";
import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import DelayLink from "../../../lib/DelayLink";
import Lee from "../../../lib/Lee";

import "./MyPageFeed.scss";

import MyPageFeedBox from "./MyPageFeedBox/MyPageFeedBox";

const MyPageFeed = (props) => {
  const FEED_QUERY = gql`
    query {
      me {
        user {
          feed_likes {
            id
            title
            paragraph
            type
            date
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
      }
    }
  `;

  let feeds;

  const { data, loading, error } = useQuery(FEED_QUERY, {
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
    feeds = data.me.user.feed_likes;
  }

  return (
    <div id="MyPageFeed">
      <div className="my-page-feed__area parents">
        <div className="my-page-feed__area__contents parents">
          <div className="my-page-feed__area__contents__title">
            내가 좋아한 피드
          </div>
          {feeds.length > 0 ? (
            <ul className="my-page-feed__area__contents__lists">
              <Masonry
                breakpointCols={2}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {feeds.map((feed, index) => {
                  return (
                    <MyPageFeedBox
                      key={`feed-${index}`}
                      id={feed.id}
                      title={feed.title}
                      paragraph={feed.paragraph}
                      thumbnail={feed.thumbnail}
                      type={feed.type}
                      date={feed.date}
                      user={feed.user}
                      likes={feed.user_likes.length}
                    />
                  );
                })}
              </Masonry>
            </ul>
          ) : (
            <div className="my-page-feed__area__contents__none">
              좋아요 표시한 피드가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageFeed;
