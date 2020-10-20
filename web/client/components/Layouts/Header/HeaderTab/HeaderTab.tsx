import React, { useEffect } from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";
import Cookies from "js-cookie";
import Router from "next/router";

import "./HeaderTab.scss";

const HeaderTab = (props) => {
  useEffect(() => {
    console.log("hi");
  });

  function auth(target) {
    if (Cookies.get("username") && Cookies.get("jwt")) {
      Lee.loadingStart();
      setTimeout(() => {
        Router.push(target);
      }, 400);
    } else {
      Lee.openLogin();
    }
  }

  function openChatbot() {
    const Chatbot = Lee.get("Chatbot");
    Lee.removeClass(Chatbot, "hide");
    Lee.removeClass(Chatbot, "invisible");
  }

  return (
    <div id="HeaderTab">
      <div className="header__tab__area parents">
        <div className="header__tab__area__contents parents">
          <ul className="header__tab__area__contents__menus">
            <DelayLink
              to="consultingList"
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <li>
                <img src="/static/icons/consulting.png" alt="consulting" />
                <br />
                상담서비스
              </li>
            </DelayLink>
            <li onClick={openChatbot}>
              <img src="/static/icons/chat-green.png" alt="chatbot" />
              <br />
              챗봇서비스
            </li>
            <li
              onClick={function () {
                auth("mypage?type=consulting");
              }}
            >
              <img src="/static/icons/mypage.png" alt="mypage" />
              <br />
              마이페이지
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderTab;
