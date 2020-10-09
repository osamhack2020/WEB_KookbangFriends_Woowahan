import React from "react";

import "./HomeMenuBox.scss";

const HomeMenuBox = (props) => {
  return (
    <div id="HomeMenuBox">
      <div className="home-menu-box__area parents">
        <div className="home-menu-box__area__contents parents">
          <div className="home-menu-box__area__contents__thumbnail">
            <img src={props.thumbnail} alt="thumbnail" />
            <div className="home-menu-box__area__contents__thumbnail__type">
              {props.type}
            </div>
          </div>
          <div className="home-menu-box__area__contents__title">
            {props.title}
          </div>
          <div className="home-menu-box__area__contents__paragraph">
            {props.paragraph}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMenuBox;
