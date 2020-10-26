import React from "react";
import Lee from "../../../../../lib/Lee";
import DelayLink from "../../../../../lib/DelayLink";

import "./CommunityBoardBestBox.scss";

function CommunityBoardBestBox(props) {
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
    <li className="community-board-best-box__area parents">
      <DelayLink
        to={`community?type=view&category=${props.type}&id=${props.id}`}
        delay={200}
        onDelayStart={function () {
          Lee.loadingStart();
        }}
      >
        <div className="community-board-best-box__area__contents parents">
          {props.thumbnail ? (
            <div className="community-board-best-box__area__contents__thumbnail">
              <img
                src={`http://127.0.0.1${props.thumbnail.url}`}
                alt="thumbnail"
              />
            </div>
          ) : (
            <div className="community-board-best-box__area__contents__thumbnail-text">
              <div className="community-board-best-box__area__contents__thumbnail-text__username">
                <span>{props.user.username} 피드</span>
              </div>
            </div>
          )}
          <div className="community-board-best-box__area__contents__fade" />
          <div className="community-board-best-box__area__contents__user parents">
            <div className="community-board-best-box__area__contents__user__thumbnail">
              {props.user.thumbnail ? (
                <img
                  src={`http://127.0.0.1${props.user.thumbnail.url}`}
                  alt="thumbnail"
                />
              ) : (
                <img src={`${props.user.avatar}`} alt="avatar" />
              )}
            </div>
            <div className="community-board-best-box__area__contents__user__info">
              <div className="community-board-best-box__area__contents__user__info__nickname">
                <span>{props.user.username}</span>
              </div>
              <div className="community-board-best-box__area__contents__user__info__date">
                {`${date.getFullYear()}년 ${month}월 ${day}일`}
              </div>
            </div>
          </div>
          <div className="community-board-best-box__area__contents__info">
            <div className="community-board-best-box__area__contents__info__title">
              {props.title}
            </div>
          </div>
          <div className="community-board-best-box__area__contents__likes">
            <img src="/static/icons/heart-fill.png" alt="like" />
            <br />
            {props.likes}
          </div>
        </div>
      </DelayLink>
    </li>
  );
}

export default CommunityBoardBestBox;
