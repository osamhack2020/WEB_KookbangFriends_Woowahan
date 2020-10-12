import React from "react";
import DelayLink from "../../../../lib/DelayLink";
import Lee from "../../../../lib/Lee";

import "./HomeTimeLineBox.scss";

const HomeTimeLineBox = (props) => {
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
    <div id="HomeTimeLineBox">
      <DelayLink
        to={`community?type=view&category=${props.type}&id=${props.id}`}
        delay={200}
        onDelayStart={function () {
          Lee.loadingStart();
        }}
      >
        <div className="home-time-line-box__area parents">
          <div className="home-time-line-box__area__contents parents">
            {props.thumbnail && (
              <div className="home-time-line-box__area__contents__thumbnail parents">
                <img
                  src={`https://osam2.kookbang.kr${props.thumbnail.url}`}
                  alt="thumbnail"
                />
              </div>
            )}
            {props.type === "국방 유튜브" ? (
              <div className="home-time-line-box__area__contents__type youtube">
                {props.type}
              </div>
            ) : (
              <div className="home-time-line-box__area__contents__type tip">
                {props.type}
              </div>
            )}
            <div className="home-time-line-box__area__contents__title">
              {props.title}
            </div>
            <div className="home-time-line-box__area__contents__paragraph">
              {props.paragraph}
            </div>
            <div className="home-time-line-box__area__contents__user parents">
              <div className="home-time-line-box__area__contents__user__thumbnail">
                {props.user.thumbnail ? (
                  <img
                    src={`https://osam2.kookbang.kr${props.user.thumbnail.url}`}
                    alt="thumbnail"
                  />
                ) : (
                  <img src={`${props.user.avatar}`} alt="avatar" />
                )}
              </div>
              <div className="home-time-line-box__area__contents__user__info">
                <div className="home-time-line-box__area__contents__user__info__nickname">
                  {props.user.username}
                </div>
                <div className="home-time-line-box__area__contents__user__info__date">
                  {`${date.getFullYear()}년 ${month}월 ${day}일`}
                </div>
              </div>
            </div>
            <div className="home-time-line-box__area__contents__likes">
              <img src="/static/icons/heart-fill.png" alt="like" />
              <br />
              {props.likes}
            </div>
          </div>
        </div>
      </DelayLink>
    </div>
  );
};

export default HomeTimeLineBox;
