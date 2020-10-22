import React from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import Router from "next/router";
import { unsetToken } from "../../../lib/auth";

import "./MyPageInfo.scss";

import MyPageInfoUser from "./MyPageInfoUser/MyPageInfoUser";

const MyPageInfo = (props) => {
  function logout() {
    unsetToken();
    Lee.loadingStart();

    setTimeout(() => {
      Router.push("/");
    }, 200);
  }

  return (
    <div id="MyPageInfo">
      <div className="my-page-info__area parents">
        <div className="my-page-info__area__contents parents">
          <MyPageInfoUser
            username={props.user.username}
            thumbnail={props.user.thumbnail}
            avatar={props.user.avatar}
          />
          {props.ver === "professional" ? (
            <ul className="my-page-info__area__contents__menu">
              <DelayLink
                to={`mypage?type=consulting&ver=professional`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <li>나의 상담내역</li>
              </DelayLink>
              <DelayLink
                to={`mypage?type=feed&ver=professional`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <li>좋아요 피드</li>
              </DelayLink>
              <li onClick={logout}>로그아웃</li>
            </ul>
          ) : (
            <ul className="my-page-info__area__contents__menu">
              <DelayLink
                to={`mypage?type=consulting`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <li>나의 상담내역</li>
              </DelayLink>
              <DelayLink
                to={`mypage?type=feed`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <li>좋아요 피드</li>
              </DelayLink>
              <li onClick={logout}>로그아웃</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageInfo;
