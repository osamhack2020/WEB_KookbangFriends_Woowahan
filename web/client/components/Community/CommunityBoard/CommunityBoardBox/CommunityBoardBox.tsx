import React from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./CommunityBoardBox.scss";

function CommunityBoardBox(props) {
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
    <li className="community-board-box__area parents">
      <div className="community-board-box__area__contents parents">
        <div className="community-board-box__area__contents__user parents">
          <div className="community-board-box__area__contents__user__thumbnail">
            {props.user.thumbnail ? (
              <img
                src={`https://osam2.kookbang.kr${props.user.thumbnail.url}`}
                alt="thumbnail"
              />
            ) : (
              <img src={`${props.user.avatar}`} alt="avatar" />
            )}
          </div>
          <div className="community-board-box__area__contents__user__info">
            <div className="community-board-box__area__contents__user__info__nickname">
              <span>{props.user.username}</span>님이
              <DelayLink
                to={`community?type=list&category=${props.type}`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <span> {props.type}</span>
              </DelayLink>
              에 피드를 추가하셨습니다.
            </div>
            <div className="community-board-box__area__contents__user__info__date">
              {`${date.getFullYear()}년 ${month}월 ${day}일`}
            </div>
          </div>
        </div>
        <DelayLink
          to={`community?type=view&category=${props.type}&id=${props.id}`}
          delay={200}
          onDelayStart={function () {
            Lee.loadingStart();
          }}
        >
          {props.thumbnail && (
            <div className="community-board-box__area__contents__thumbnail">
              <img
                src={`https://osam2.kookbang.kr${props.thumbnail.url}`}
                alt="thumbnail"
              />
            </div>
          )}
          <div className="community-board-box__area__contents__info">
            <div className="community-board-box__area__contents__info__title">
              {props.title}
            </div>
            <div className="community-board-box__area__contents__info__description">
              <span
                dangerouslySetInnerHTML={{
                  __html: props.description.replace(
                    /(?:\r\n|\r|\n)/g,
                    "<br />"
                  ),
                }}
              ></span>
            </div>
          </div>
          <div className="community-board-box__area__contents__view">
            <span>자세히 보기</span>
            <img src="/static/icons/right-arrow.png" alt="view" />
          </div>
          <div className="community-board-box__area__contents__likes">
            <img src="/static/icons/heart-fill.png" alt="like" />
            <br />
            {props.likes}
          </div>
        </DelayLink>
      </div>
    </li>
  );
}

export default CommunityBoardBox;
