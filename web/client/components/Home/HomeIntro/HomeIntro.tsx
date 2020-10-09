import React from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./HomeIntro.scss";

const HomeIntro = () => {
  return (
    <div id="HomeIntro">
      <div className="home-intro__area parents">
        <div className="home-intro__area__background parents">
          {/* <img src="/static/images/preview-background.jpg" alt="background" /> */}
          <video autoPlay loop muted playsInline>
            <source src="/static/videos/home-video.webm" type="video/webm" />
            <source src="/static/videos/home-video.mp4" type="video/mp4" />
          </video>
          <div className="home-intro__area__fade" />
        </div>
        <div className="home-intro__area__contents">
          <div className="home-intro__area__contents__text">
            <div className="home-intro__area__contents__text__title">
              병영 생활의 든든한 친구!
            </div>
            <div className="home-intro__area__contents__text__paragraph">
              국방프렌즈는 병영 생활을 하며 생기는 다양한 고민과 고충을 친구에게
              말하는 것처럼 부담 없이 이야기하고 상담받을 수 있습니다.
            </div>
            <div className="home-intro__area__contents__text__button">
              <DelayLink
                to="about"
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                소개 보기
              </DelayLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeIntro;
