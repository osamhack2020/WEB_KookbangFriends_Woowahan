import React from "react";

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
            <img
              src={`https://api.kookbang.kr${props.user.thumbnail.url}`}
              alt="thumbnail"
            />
          </div>
          <div className="community-board-box__area__contents__user__info">
            <div className="community-board-box__area__contents__user__info__nickname">
              <span>{props.user.username}</span>님이 <span>{props.type}</span>에
              피드를 추가하셨습니다.
            </div>
            <div className="community-board-box__area__contents__user__info__date">
              {`${date.getFullYear()}년 ${month}월 ${day}일`}
            </div>
          </div>
        </div>
        {props.thumbnail && (
          <div className="community-board-box__area__contents__thumbnail">
            <img
              src={`https://api.kookbang.kr${props.thumbnail.url}`}
              alt="thumbnail"
            />
          </div>
        )}
        <div className="community-board-box__area__contents__info">
          <div className="community-board-box__area__contents__info__title">
            {props.title}
          </div>
          <div className="community-board-box__area__contents__info__paragraph">
            {props.paragraph}
          </div>
        </div>
        <div className="community-board-box__area__contents__view">
          <span>자세히 보기</span>
          <img src="/static/icons/right-arrow.png" alt="view" />
        </div>
      </div>
    </li>
  );
}

export default CommunityBoardBox;