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

const Header = () => {
  let [login, setLogin] = useState(false);

  useEffect(() => {
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
    } else {
      Lee.removeClass(header, "community");
      Lee.removeClass(footer, "community");
    }
  });

  return (
    <div id="Header">
      <Login />
      <Registration />
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
              <li>소개</li>
            </DelayLink>
            <DelayLink
              to="consultingList"
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <li>상담 서비스</li>
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
          <ul className="header__area__contents__logins">
            {login ? (
              <HeaderUser />
            ) : (
              <>
                <li onClick={Lee.openLogin}>로그인</li>
                <li onClick={Lee.openRegistration}>회원가입</li>
                <DelayLink
                  to="community?type=전체게시글"
                  delay={200}
                  onDelayStart={function () {
                    Lee.loadingStart();
                  }}
                >
                  <li className="community">커뮤니티</li>
                </DelayLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
