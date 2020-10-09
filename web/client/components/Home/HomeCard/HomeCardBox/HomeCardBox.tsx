import React from "react";
import DelayLink from "../../../../lib/DelayLink";
import Lee from "../../../../lib/Lee";

import "./HomeCardBox.scss";

const HomeCardBox = (props) => {
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
              {props.date}
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
