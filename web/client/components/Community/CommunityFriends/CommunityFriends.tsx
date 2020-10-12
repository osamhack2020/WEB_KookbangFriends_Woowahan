import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./CommunityFriends.scss";

const FEED_QUERY = gql`
  query {
    feeds {
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

function CommunityFriends(props) {
  useEffect(() => {
    Lee.loadingFinish();
  });

  let friendsAll;
  let friends = [];

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
    friendsAll = data.feeds;

    friendsAll.map((friend) => {
      let check = false;
      for (let i = 0; i < friends.length; i++) {
        if (friends[i].username === friend.user.username) {
          check = true;
          friends[i].count = friends[i].count + 1;
          break;
        }
      }
      if (!check) {
        friends.push({
          username: friend.user.username,
          thumbnail: friend.user.thumbnail,
          avatar: friend.user.avatar,
          count: 1,
        });
      }
    });

    friends.sort((a, b) => b.count - a.count);
  }

  return (
    <div className="community-friends__area">
      <div className="community-friends__area__contents parents">
        <div className="community-friends__area__contents__title">
          인기 프렌즈 TOP5
        </div>
        <div className="community-friends__area__contents__friends parents">
          <ul className="community-friends__area__contents__friends__lists">
            {friends.map((friend, index) => {
              if (index < 5) {
                return (
                  <li key={index}>
                    <div className="community-friends__area__contents__friends__lists__thumbnail">
                      {friend.thumbnail ? (
                        <img
                          src={`https://osam2.kookbang.kr${friend.thumbnail.url}`}
                          alt="thumbnail"
                        />
                      ) : (
                        <img src={`${friend.avatar}`} alt="thumbnail" />
                      )}
                    </div>
                    <div className="community-friends__area__contents__friends__lists__user">
                      <div className="community-friends__area__contents__friends__lists__user__username">
                        {friend.username}
                      </div>
                      <div className="community-friends__area__contents__friends__lists__user__count">
                        {friend.count}개의 피드
                      </div>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CommunityFriends;
