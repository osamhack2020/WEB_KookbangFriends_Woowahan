import React from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./SupportBoardBox.scss";

function SupportBoardBox(props) {
  const date = new Date(props.date);
  let month;
  let day;

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

  return (
    <li className="support-board-box__area">
      <DelayLink
        to={`viewSupport?type=${props.type}&id=${props.id}`}
        delay={200}
        onDelayStart={function () {
          Lee.loadingStart();
        }}
      >
        <div className="support-board-box__area__contents">
          {props.index === 0 && (
            <div className="support-board-box__area__contents__new">N</div>
          )}
          <div className="support-board-box__area__contents__info parents">
            <div className="support-board-box__area__contents__info__thumbnail">
              {props.user.thumbnail ? (
                <img
                  src={`https://osam2.kookbang.kr${props.user.thumbnail.url}`}
                  alt="thumbnail"
                />
              ) : (
                <img src={props.user.avatar} alt="thumbnail" />
              )}
            </div>
            <div className="support-board-box__area__contents__info__user">
              <div className="support-board-box__area__contents__info__user__username">
                {props.user.username}
              </div>
              <div className="support-board-box__area__contents__info__user__date">
                {`${date.getFullYear()}년 ${month}월 ${day}일`}
              </div>
            </div>
          </div>
          <div className="support-board-box__area__contents__title">
            {props.title}
          </div>
          <div className="support-board-box__area__contents__view">
            <span>자세히 보기</span>
            <img src="/static/icons/right-arrow.png" alt="view" />
          </div>
        </div>
      </DelayLink>
    </li>
  );
}

export default SupportBoardBox;
