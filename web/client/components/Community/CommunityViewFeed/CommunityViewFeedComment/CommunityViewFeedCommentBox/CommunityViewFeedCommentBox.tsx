import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Cookies from "js-cookie";

import "./CommunityViewFeedCommentBox.scss";

const COMMENT_DELETE = gql`
  mutation($id: ID!) {
    deleteFeedComment(input: { where: { id: $id } }) {
      feedComment {
        id
      }
    }
  }
`;

function CommunityViewFeedCommentBox(props) {
  let [permission, setPermission] = useState(false);

  useEffect(() => {
    if (props.login) {
      if (props.user.id === jwtDecode(Cookies.get("jwt")).id) {
        setPermission(true);
      } else {
        setPermission(false);
      }
    } else {
      setPermission(false);
    }
  });

  const [deleteComment] = useMutation(COMMENT_DELETE, {
    onCompleted({ deleteFeedComment: { feedComment } }) {
      props.comments.map((comment, index) => {
        if (comment.id === feedComment.id) {
          let newArr = props.comments;
          newArr.splice(index, 1);
          props.setComments([...newArr]);
        }
      });
    },
  });

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    const addComment = async () => {
      try {
        deleteComment({
          variables: {
            id: props.id,
          },
        });
      } catch {
        alert(`요청이 잘못 되었습니다.`);
      }
    };

    addComment();
  };

  const date = new Date(props.date);
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
    <li className="community-view-feed-comment-box__area parents">
      <div className="community-view-feed-comment-box__area__contents parents">
        <div className="community-view-feed-comment-box__area__contents__thumbnail">
          {props.user.thumbnail ? (
            <img
              src={`https://osam2.kookbang.kr${props.user.thumbnail.url}`}
              alt="thumbnail"
            />
          ) : (
            <img src={props.user.avatar} alt="thumbnail" />
          )}
        </div>
        <div className="community-view-feed-comment-box__area__contents__info">
          <div className="community-view-feed-comment-box__area__contents__info__stat parents">
            <div className="community-view-feed-comment-box__area__contents__info__stat__username">
              {props.user.username}
            </div>
            <div className="community-view-feed-comment-box__area__contents__info__stat__date">
              {`${date.getFullYear()}.${month}.${day} ${hour}:${minute}`}
            </div>
          </div>
          <div className="community-view-feed-comment-box__area__contents__info__description">
            <span
              dangerouslySetInnerHTML={{
                __html: props.description.replace(/(?:\r\n|\r|\n)/g, "<br />"),
              }}
            ></span>
          </div>
        </div>
        {permission && (
          <div
            className="community-view-feed-comment-box__area__contents__delete"
            onClick={handleSubmit}
          >
            댓글 삭제
          </div>
        )}
      </div>
    </li>
  );
}

export default CommunityViewFeedCommentBox;
