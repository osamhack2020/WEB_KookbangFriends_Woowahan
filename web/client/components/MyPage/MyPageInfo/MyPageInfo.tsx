import React from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import Cookies from "js-cookie";

import "./MyPageInfo.scss";

import MyPageInfoUser from "./MyPageInfoUser/MyPageInfoUser";

const MyPageInfo = (props) => {
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
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageInfo;
