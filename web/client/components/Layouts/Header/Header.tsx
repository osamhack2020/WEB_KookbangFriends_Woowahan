import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

import "./Header.scss";

import HeaderUser from "./HeaderUser/HeaderUser";

const Login = dynamic(import("../Login/Login"), {
  ssr: false,
});

const Registration = dynamic(import("../Registration/Registration"), {
  ssr: false,
});

const HeaderTab = dynamic(import("./HeaderTab/HeaderTab"), {
  ssr: false,
});

const Header = () => {
  let [login, setLogin] = useState(false);

  useEffect(() => {
    Lee.closeMenu();
    Lee.closeChatbot();

    const header = Lee.get("Header");
    const footer = Lee.get("Footer");

    if (Cookies.get("username") && Cookies.get("jwt")) {
      setLogin(true);
    } else {
      setLogin(false);
    }

    if (location.pathname === "/community") {
      Lee.addClass(header, "community");
      Lee.addClass(footer, "community");
      Lee.removeClass(header, "mypage");
    } else if (location.pathname === "/mypage") {
      Lee.addClass(header, "mypage");
      Lee.removeClass(header, "community");
    } else {
      Lee.removeClass(header, "community");
      Lee.removeClass(header, "mypage");
      Lee.removeClass(footer, "community");
    }
  });

  return (
    <div id="Header">
      <Login />
      <Registration />
      <HeaderTab />
      <div className="header__area parents">
        <div className="header__area__contents parents">
          <DelayLink
            to=""
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            <div className="header__area__contents__logo">
              국방프렌즈
              <img src="/static/icons/logo.png" alt="logo" />
            </div>
          </DelayLink>
          <ul className="header__area__contents__menus">
            <DelayLink
              to="about"
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <li className="pc">소개</li>
            </DelayLink>
            <DelayLink
              to="consultingList"
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <li className="pc">상담 서비스</li>
            </DelayLink>
            <DelayLink
              to="card"
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <li className="pc">카드뉴스</li>
            </DelayLink>
            <DelayLink
              to="support?type=공지사항"
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <li className="pc">체계지원</li>
            </DelayLink>
            <DelayLink
              to={`community?type=list&category=전체게시글`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <li className="community mobile">국방 SNS</li>
            </DelayLink>
          </ul>
          <ul className="header__area__contents__logins">
            {login ? (
              <HeaderUser />
            ) : (
              <>
                <DelayLink
                  to={`community?type=list&category=전체게시글`}
                  delay={200}
                  onDelayStart={function () {
                    Lee.loadingStart();
                  }}
                >
                  <li className="community">국방 SNS</li>
                </DelayLink>
                <li onClick={Lee.openRegistration}>회원가입</li>
                <li onClick={Lee.openLogin}>로그인</li>
              </>
            )}
          </ul>
          <div className="header__area__contents__menu-icon">
            <div id="menuIcon" className="" onClick={Lee.openMenu}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div className="header__area__contents__menus-mobile" id="mobileMenu">
        <ul className="header__area__contents__menus-mobile__lists">
          <DelayLink
            to="about"
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            <li>소개</li>
          </DelayLink>
          <DelayLink
            to="consultingList"
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            <li>상담서비스</li>
          </DelayLink>
          <DelayLink
            to={`community?type=list&category=전체게시글`}
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            <li>SNS</li>
          </DelayLink>
          <DelayLink
            to="card"
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            <li>카드뉴스</li>
          </DelayLink>
          <DelayLink
            to="support?type=공지사항"
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            <li>체계지원</li>
          </DelayLink>
        </ul>
        <img
          src="/static/characters/male/I_7914273_3_15898a66095_064.png"
          alt="character"
          className="header__area__contents__menus-mobile__lists__character-1"
        />
        <img
          src="/static/characters/g20/I_7914891_2_15898a71562_508.png"
          alt="character"
          className="header__area__contents__menus-mobile__lists__character-2"
        />
        <img
          src="/static/characters/e20/I_7914980_5_15898a72011_676.png"
          alt="character"
          className="header__area__contents__menus-mobile__lists__character-3"
        />
        <img
          src="/static/characters/a40/I_7915493_5_15898a76872_959.png"
          alt="character"
          className="header__area__contents__menus-mobile__lists__character-4"
        />
        <img
          src="/static/characters/female/I_7914304_2_15898a66219_777.png"
          alt="character"
          className="header__area__contents__menus-mobile__lists__character-5"
        />
      </div>
    </div>
  );
};

export default Header;
