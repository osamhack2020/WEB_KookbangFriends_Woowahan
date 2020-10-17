import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./CommunityViewFeed.scss";

import CommunityViewFeedComment from "./CommunityViewFeedComment/CommunityViewFeedComment";
import CommunityViewFeedLike from "./CommunityViewFeedLike/CommunityViewFeedLike";

const FEED_QUERY = gql`
  query($id: ID!) {
    feeds(where: { id: $id }) {
      id
      title
      thumbnail {
        url
      }
      type
      description
      date
      user {
        username
        thumbnail {
          url
        }
        avatar
      }
      user_likes {
        id
      }
      feed_comments {
        id
        description
        createdAt
        user {
          id
          username
          thumbnail {
            url
          }
          avatar
        }
      }
    }
  }
`;

function CommunityViewFeed(props) {
  useEffect(() => {
    Lee.loadingFinish();
  });

  let feed;

  const { data, loading, error } = useQuery(FEED_QUERY, {
    ssr: false,
    variables: {
      id: props.id,
    },
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
    feed = data.feeds[0];
  }

  const date = new Date(feed.date);
  let month;
  let day;
  let hour;
  let minute;

  if (date.getMonth() + 1 < 10) {
    month = "0" + (date.getMonth() + 1);
  } else {
    month = date.getMonth() + 1;
  }

  if (date.getDate() < 10) {
    day = "0" + date.getDate();
  } else {
    day = date.getDate();
  }

  if (date.getHours() < 10) {
    hour = "0" + date.getHours();
  } else {
    hour = date.getHours();
  }

  if (date.getMinutes() < 10) {
    minute = "0" + date.getMinutes();
  } else {
    minute = date.getMinutes();
  }

  return (
    <div className="community-view-feed__area">
      <div className="community-view-feed__area__contents parents">
        <div className="community-view-feed__area__contents__user parents">
          <div className="community-view-feed__area__contents__user__thumbnail">
            {feed.user.thumbnail ? (
              <img
                src={`https://osam2.kookbang.kr${feed.user.thumbnail.url}`}
                alt="thumbnail"
              />
            ) : (
              <img src={feed.user.avatar} alt="avatar" />
            )}
          </div>
          <div className="community-view-feed__area__contents__user__info">
            <div className="community-view-feed__area__contents__user__info__username">
              {feed.user.username}
            </div>
            <div className="community-view-feed__area__contents__user__info__date">
              {`${date.getFullYear()}년 ${month}월 ${day}일`}
            </div>
          </div>
        </div>
        <div className="community-view-feed__area__contents__thumbnail">
          {feed.thumbnail && (
            <img
              src={`https://osam2.kookbang.kr${feed.thumbnail.url}`}
              alt="thumbnail"
            />
          )}
        </div>
        <div className="community-view-feed__area__contents__category">
          {feed.type}
        </div>
        <div className="community-view-feed__area__contents__title">
          {feed.title}
        </div>
        <div className="community-view-feed__area__contents__description parents">
          <span
            dangerouslySetInnerHTML={{
              __html: feed.description.replace(/(?:\r\n|\r|\n)/g, "<br />"),
            }}
          ></span>
        </div>
        <CommunityViewFeedLike like={feed.user_likes} id={feed.id} />
        <CommunityViewFeedComment id={feed.id} comments={feed.feed_comments} />
      </div>
    </div>
  );
}

export default CommunityViewFeed;
