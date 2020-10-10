import React from "react";

import "./MyPageViewConsultingCommentBox.scss";

function MyPageViewConsultingCommentBox(props) {
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
    <li className="my-page-view-consulting-comment-box__area parents">
      <div className="my-page-view-consulting-comment-box__area__contents parents">
        <div className="my-page-view-consulting-comment-box__area__contents__thumbnail">
          {props.user.thumbnail ? (
            <img
              src={`https://osam2.kookbang.kr${props.user.thumbnail.url}`}
              alt="thumbnail"
            />
          ) : (
            <img src={props.user.avatar} alt="thumbnail" />
          )}
        </div>
        <div className="my-page-view-consulting-comment-box__area__contents__info">
          <div className="my-page-view-consulting-comment-box__area__contents__info__stat parents">
            <div className="my-page-view-consulting-comment-box__area__contents__info__stat__username">
              {props.user.username}
            </div>
            <div className="my-page-view-consulting-comment-box__area__contents__info__stat__date">
              {`${date.getFullYear()}.${month}.${day} ${hour}:${minute}`}
            </div>
          </div>
          <div className="my-page-view-consulting-comment-box__area__contents__info__description">
            <span
              dangerouslySetInnerHTML={{
                __html: props.description.replace(/(?:\r\n|\r|\n)/g, "<br />"),
              }}
            ></span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MyPageViewConsultingCommentBox;
