import React from "react";
import DelayLink from "../../../../lib/DelayLink";
import Lee from "../../../../lib/Lee";

import "./CardListBox.scss";

function CardListBox(props) {
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
    <div className="card-list-box__area">
      <DelayLink
        to={`viewCard?id=${props.id}`}
        delay={200}
        onDelayStart={function () {
          Lee.loadingStart();
        }}
      >
        <div className="card-list-box__area__contents">
          <div className="card-list-box__area__contents__thumbnail">
            <img
              src={`https://api.kookbang.kr${props.thumbnail.url}`}
              alt="thumbnail"
            />
          </div>
          <div className="card-list-box__area__contents__info parents">
            <div className="card-list-box__area__contents__info__date">{`${date.getFullYear()}년 ${month}월 ${day}일`}</div>
            <div className="card-list-box__area__contents__info__title">
              {props.title}
            </div>
            <div className="card-list-box__area__contents__info__button">
              바로 보기
            </div>
          </div>
        </div>
      </DelayLink>
    </div>
  );
}

export default CardListBox;
