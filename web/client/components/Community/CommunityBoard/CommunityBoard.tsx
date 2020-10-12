import React from "react";
import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./CommunityBoard.scss";

import CommunityBoardBox from "./CommunityBoardBox/CommunityBoardBox";

function CommunityBoard(props) {
  let FEED_QUERY;

  if (props.category === "전체게시글") {
    FEED_QUERY = gql`
      query {
        feeds {
          id
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
          user_likes {
            username
          }
        }
      }
    `;
  } else {
    FEED_QUERY = gql`
      query($type: String!) {
        feeds(where: { type: $type }) {
          id
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
          user_likes {
            username
          }
        }
      }
    `;
  }

  let feeds;

  const { data, loading, error } = useQuery(FEED_QUERY, {
    ssr: true,
    variables: { type: props.category },
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
    <div id="CommunityBoard">
      <div className="community-board__area parents">
        <div className="community-board__area__contents parents">
          {feeds.length > 0 ? (
            <ul className="community-board__area__contents__board parents">
              <Masonry
                breakpointCols={1}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {feeds.map((feed, index) => {
                  return (
                    <CommunityBoardBox
                      key={`feed-${index}`}
                      id={feed.id}
                      title={feed.title}
                      thumbnail={feed.thumbnail}
                      date={feed.date}
                      user={feed.user}
                      type={feed.type}
                      paragraph={feed.paragraph}
                      likes={feed.user_likes.length}
                    />
                  );
                })}
              </Masonry>
            </ul>
          ) : (
            <div className="community-board__area__contents__board-nothing">
              등록된 게시물이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityBoard;
