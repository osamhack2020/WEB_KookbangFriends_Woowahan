import React from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./HomeMenu.scss";

import HomeMenuBox from "./HomeMenuBox/HomeMenuBox";

const HomeMenu = () => {
  return (
    <div id="HomeMenu">
      <div className="home-menu__area parents">
        <div className="home-menu__area__contents parents">
          <ul className="home-menu__area__contents__menus">
            <li>
              <DelayLink
                to="consultingList"
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <HomeMenuBox
                  title="친구에게 말하듯 편하게 상담 받으세요!"
                  paragraph="여러분의 고민과 고충을 철저한 익명으로 전문 상담관에게 상담 받으실 수 있습니다."
                  thumbnail="/static/images/home-consulting.jpg"
                  type="상담 서비스"
                />
              </DelayLink>
            </li>
            <li>
              <DelayLink
                to={`community?type=list&category=전체게시글`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <HomeMenuBox
                  title="다른 병영 친구들과 정보를 공유하세요!"
                  paragraph="병영생활 팁, 고민, 지식 등을 다른 군 장병 및 군무원분들과 공유할 수 있습니다."
                  thumbnail="/static/images/home-community.jpg"
                  type="국방 SNS"
                />
              </DelayLink>
            </li>
            <li>
              <DelayLink
                to={`community?type=list&category=국방유튜브`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <HomeMenuBox
                  title="대한민국 국군의 소식을 빠르게 만나보세요!"
                  paragraph="국민과 함께 만드는 강한 국방, 강한 힘으로 무장된 대한민국 국군의 소식을 알립니다."
                  thumbnail="/static/images/home-youtube.jpg"
                  type="국방유튜브"
                />
              </DelayLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;
