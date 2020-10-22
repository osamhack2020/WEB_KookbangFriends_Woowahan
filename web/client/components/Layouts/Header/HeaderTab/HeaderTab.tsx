import React, { useEffect } from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";
import Cookies from "js-cookie";
import Router from "next/router";

import "./HeaderTab.scss";

const HeaderTab = () => {
  useEffect(() => {
    const consultingTab = Lee.get("consultingTab");
    const mypageTab = Lee.get("mypageTab");
    const chatbotTab = Lee.get("chatbotTab");

    if (location.pathname === "/mypage") {
      Lee.addClass(mypageTab, "active");
      Lee.removeClass(consultingTab, "active");
    } else if (
      location.pathname === "/consultingList" ||
      location.pathname === "/consulting" ||
      location.pathname === "/viewConsulting"
    ) {
      Lee.addClass(consultingTab, "active");
      Lee.removeClass(mypageTab, "active");
    } else {
      Lee.removeClass(consultingTab, "active");
      Lee.removeClass(mypageTab, "active");
    }

    Lee.removeClass(chatbotTab, "active");
  });

  function auth(target) {
    if (Cookies.get("username") && Cookies.get("jwt")) {
      Lee.closeChatbot();
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

    const consultingTab = Lee.get("consultingTab");
    const mypageTab = Lee.get("mypageTab");
    const chatbotTab = Lee.get("chatbotTab");

    Lee.addClass(chatbotTab, "active");
    Lee.removeClass(consultingTab, "active");
    Lee.removeClass(mypageTab, "active");

    Lee.removeClass(Chatbot, "hide");
    Lee.removeClass(Chatbot, "invisible");
    Lee.closeMenu();
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

                setTimeout(() => {
                  Lee.closeChatbot();
                }, 200);
              }}
            >
              <li id="consultingTab">
                <img src="/static/icons/consulting.png" alt="consulting" />
                <br />
                상담서비스
              </li>
            </DelayLink>
            <li onClick={openChatbot} id="chatbotTab">
              <img src="/static/icons/chat-green.png" alt="chatbot" />
              <br />
              챗봇서비스
            </li>
            <li
              onClick={function () {
                auth("mypage?type=consulting");
              }}
              id="mypageTab"
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
