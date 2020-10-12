import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Cookies from "js-cookie";
import Lee from "../../../../lib/Lee";

import "./CommunityViewFeedLike.scss";

const FEED_UPDATE = gql`
  mutation($feedID: ID!, $userID: [ID]!) {
    updateFeed(
      input: { where: { id: $feedID }, data: { user_likes: $userID } }
    ) {
      feed {
        title
      }
    }
  }
`;

function CommunityViewFeedLike(props) {
  let [addPermission, setAddPermission] = useState(false);
  let [deletePermission, setDeletePermission] = useState(false);

  useEffect(() => {
    if (Cookies.get("jwt")) {
      let check = false;

      props.like.map((like) => {
        if (like.id === jwtDecode(Cookies.get("jwt")).id) {
          check = true;
        }
      });

      if (check) {
        setAddPermission(false);
        setDeletePermission(true);
      } else {
        setAddPermission(true);
        setDeletePermission(false);
      }
    } else {
      setAddPermission(false);
      setDeletePermission(false);
    }
  });

  const [updateLike] = useMutation(FEED_UPDATE);

  const addLike = async (e: React.ChangeEvent<any>) => {
    let likers = [];

    props.like.map((like) => {
      likers.push(like.id);
    });

    likers.push(jwtDecode(Cookies.get("jwt")).id);

    const updateFeed = async () => {
      try {
        updateLike({
          variables: {
            feedID: props.id,
            userID: likers,
          },
        });

        location.reload();
      } catch {
        alert(`요청이 잘못 되었습니다.`);
      }
    };

    updateFeed();
  };

  const deleteLike = async (e: React.ChangeEvent<any>) => {
    let likers = [];

    props.like.map((like) => {
      likers.push(like.id);
    });

    likers.splice(likers.indexOf(jwtDecode(Cookies.get("jwt")).id), 1);

    const updateFeed = async () => {
      try {
        updateLike({
          variables: {
            feedID: props.id,
            userID: likers,
          },
        });

        location.reload();
      } catch {
        alert(`요청이 잘못 되었습니다.`);
      }
    };

    updateFeed();
  };

  return (
    <div className="community-view-feed-like__area parents">
      {addPermission ? (
        <div
          className="community-view-feed-like__area__contents parents"
          onClick={addLike}
        >
          <img src="/static/icons/heart-line.png" alt="like" />
          <br />
          <span>{props.like.length}</span>
        </div>
      ) : deletePermission ? (
        <div
          className="community-view-feed-like__area__contents fill parents"
          onClick={deleteLike}
        >
          <img src="/static/icons/heart-fill.png" alt="like" />
          <br />
          <span>{props.like.length}</span>
        </div>
      ) : (
        <div
          className="community-view-feed-like__area__contents parents"
          onClick={Lee.openLogin}
        >
          <img src="/static/icons/heart-line.png" alt="like" />
          <br />
          <span>{props.like.length}</span>
        </div>
      )}
    </div>
  );
}

export default CommunityViewFeedLike;
