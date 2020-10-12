import React from "react";
import DelayLink from "../../../../lib/DelayLink";
import Lee from "../../../../lib/Lee";

import "./HomeCardBox.scss";

const HomeCardBox = (props) => {
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
    <div id="HomeCardBox">
      <DelayLink
        to={`viewCard?id=${props.id}`}
        delay={200}
        onDelayStart={function () {
          Lee.loadingStart();
        }}
      >
        <div className="home-card-box__area parents">
          <div className="home-card-box__area__contents parents">
            <div className="home-card-box__area__contents__thumbnail parents">
              <img
                src={`https://osam2.kookbang.kr${props.thumbnail}`}
                alt="thumbnail"
              />
            </div>
            <div className="home-card-box__area__contents__date">
              {`${date.getFullYear()}년 ${month}월 ${day}일`}
            </div>
            <div className="home-card-box__area__contents__title">
              {props.title}
            </div>
          </div>
        </div>
      </DelayLink>
    </div>
  );
};

export default HomeCardBox;
