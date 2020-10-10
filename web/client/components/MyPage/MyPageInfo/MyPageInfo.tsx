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
          <ul className="my-page-info__area__contents__menu">
            <DelayLink
              to="mypage?type=consulting"
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <li className="selected">나의 상담내역</li>
            </DelayLink>
            <li>좋아요 피드</li>
            <li>체력검정기록</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPageInfo;
