import React from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import "./CommunityNav.scss";

function CommunityNav(props) {
  return (
    <div className="community-nav__area">
      <div className="community-nav__area__contents parents">
        <div className="community-nav__area__contents__category">
          <div className="community-nav__area__contents__category__title">
            카테고리
          </div>
          <ul className="community-nav__area__contents__category__lists">
            <DelayLink
              to={`community?type=list&category=전체게시글`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              {props.category === "전체게시글" ? (
                <li className="selected">
                  <img src="/static/icons/chat.png" alt="icon" />
                  <span>전체게시글</span>
                </li>
              ) : (
                <li>
                  <img src="/static/icons/chat.png" alt="icon" />
                  <span>전체게시글</span>
                </li>
              )}
            </DelayLink>
            <DelayLink
              to={`community?type=list&category=자유게시판`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              {props.category === "자유게시판" ? (
                <li className="selected">
                  <img src="/static/icons/communication.png" alt="icon" />
                  <span>자유게시판</span>
                </li>
              ) : (
                <li>
                  <img src="/static/icons/communication.png" alt="icon" />
                  <span>자유게시판</span>
                </li>
              )}
            </DelayLink>
            <DelayLink
              to={`community?type=list&category=병영노하우`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              {props.category === "병영노하우" ? (
                <li className="selected">
                  <img src="/static/icons/tips.png" alt="icon" />
                  <span>병영노하우</span>
                </li>
              ) : (
                <li>
                  <img src="/static/icons/tips.png" alt="icon" />
                  <span>병영노하우</span>
                </li>
              )}
            </DelayLink>
            <DelayLink
              to={`community?type=list&category=동아리모집`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              {props.category === "동아리모집" ? (
                <li className="selected">
                  <img src="/static/icons/color-circle.png" alt="icon" />
                  <span>동아리모집</span>
                </li>
              ) : (
                <li>
                  <img src="/static/icons/color-circle.png" alt="icon" />
                  <span>동아리모집</span>
                </li>
              )}
            </DelayLink>
            <DelayLink
              to={`community?type=list&category=고민나누기`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              {props.category === "고민나누기" ? (
                <li className="selected">
                  <img src="/static/icons/hope.png" alt="icon" />
                  <span>고민나누기</span>
                </li>
              ) : (
                <li>
                  <img src="/static/icons/hope.png" alt="icon" />
                  <span>고민나누기</span>
                </li>
              )}
            </DelayLink>
            <DelayLink
              to={`community?type=list&category=국방마켓`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              {props.category === "국방마켓" ? (
                <li className="selected">
                  <img src="/static/icons/shopping-cart.png" alt="icon" />
                  <span>국방마켓</span>
                </li>
              ) : (
                <li>
                  <img src="/static/icons/shopping-cart.png" alt="icon" />
                  <span>국방마켓</span>
                </li>
              )}
            </DelayLink>
            <DelayLink
              to={`community?type=list&category=국방유튜브`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              {props.category === "국방유튜브" ? (
                <li className="selected">
                  <img src="/static/icons/youtube.png" alt="icon" />
                  <span>국방유튜브</span>
                </li>
              ) : (
                <li>
                  <img src="/static/icons/youtube.png" alt="icon" />
                  <span>국방유튜브</span>
                </li>
              )}
            </DelayLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CommunityNav;
