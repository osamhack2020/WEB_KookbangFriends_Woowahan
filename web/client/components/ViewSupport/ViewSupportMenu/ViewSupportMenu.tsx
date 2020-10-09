import React from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./ViewSupportMenu.scss";

function ViewSupportMenu(props) {
  return (
    <div className="view-support-menu__area">
      <div className="view-support-menu__area__contents parents">
        <ul className="view-support-menu__area__contents__lists">
          <DelayLink
            to="support?type=공지사항"
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            {props.type === "공지사항" ? (
              <li className="selected">공지사항</li>
            ) : (
              <li>공지사항</li>
            )}
          </DelayLink>
          <DelayLink
            to="support?type=건의사항"
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            {props.type === "건의사항" ? (
              <li className="selected">건의사항</li>
            ) : (
              <li>건의사항</li>
            )}
          </DelayLink>
          <DelayLink
            to="support?type=문의사항"
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            {props.type === "문의사항" ? (
              <li className="selected">문의사항</li>
            ) : (
              <li>문의사항</li>
            )}
          </DelayLink>
          <DelayLink
            to="support?type=자주묻는질문"
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            {props.type === "자주묻는질문" ? (
              <li className="selected">자주묻는질문</li>
            ) : (
              <li>자주묻는질문</li>
            )}
          </DelayLink>
        </ul>
      </div>
    </div>
  );
}

export default ViewSupportMenu;
