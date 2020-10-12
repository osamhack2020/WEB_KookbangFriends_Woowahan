import React from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./MyPageFeedBox.scss";

function MyPageFeedBox(props) {
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
    <li className="my-page-feed-box__area">
      <DelayLink
        to={`community?type=view&category=${props.type}&id=${props.id}`}
        delay={200}
        onDelayStart={function () {
          Lee.loadingStart();
        }}
      >
        <div className="my-page-feed-box__area__contents">
          {props.thumbnail && (
            <div className="my-page-feed-box__area__contents__thumbnail">
              <img
                src={`https://osam2.kookbang.kr${props.thumbnail.url}`}
                alt="thumbnail"
              />
            </div>
          )}
          <div className="my-page-feed-box__area__contents__info parents">
            <div className="my-page-feed-box__area__contents__info__type">
              {props.type}
            </div>
            <div className="my-page-feed-box__area__contents__info__title">
              {props.title}
            </div>
            <div className="my-page-feed-box__area__contents__info__paragraph">
              {props.paragraph}
            </div>
            <div className="my-page-feed-box__area__contents__info__view">
              <span>자세히 보기</span>
              <img src="/static/icons/right-arrow.png" alt="view" />
            </div>
          </div>
          <div className="my-page-feed-box__area__contents__user parents">
            <div className="my-page-feed-box__area__contents__user__thumbnail">
              {props.user.thumbnail ? (
                <img
                  src={`https://osam2.kookbang.kr${props.user.thumbnail.url}`}
                  alt="thumbnail"
                />
              ) : (
                <img src={`${props.user.avatar}`} alt="avatar" />
              )}
            </div>
            <div className="my-page-feed-box__area__contents__user__info">
              <div className="my-page-feed-box__area__contents__user__info__nickname">
                {props.user.username}
              </div>
              <div className="my-page-feed-box__area__contents__user__info__date">
                {`${date.getFullYear()}년 ${month}월 ${day}일`}
              </div>
              <div className="my-page-feed-box__area__contents__user__info__likes">
                <img src="/static/icons/heart-fill.png" alt="like" />
                <br />
                {props.likes}
              </div>
            </div>
          </div>
        </div>
      </DelayLink>
    </li>
  );
}

export default MyPageFeedBox;
