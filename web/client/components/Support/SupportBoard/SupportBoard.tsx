import React from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./SupportBoard.scss";

import SupportBoardBox from "./SupportBoardBox/SupportBoardBox";

function SupportBoard(props) {
  return (
    <div id="SupportBoard">
      <div className="support-board__area">
        <div className="support-board__area__contents parents">
          <div className="support-board__area__contents__title">
            {props.subject}
          </div>
          {props.subject !== "공지사항" &&
            props.subject !== "자주묻는질문" &&
            props.login && (
              <DelayLink
                to={`postSupport?type=${props.subject}`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <div className="support-board__area__contents__post">
                  등록하기
                </div>
              </DelayLink>
            )}
          <div className="support-board__area__contents__top parents">
            {props.subject === "공지사항" && (
              <div className="support-board__area__contents__top__paragraph">
                국방프렌즈에서 원활한 서비스 이용을 위한 공지사항 및 이벤트를
                공지합니다.
              </div>
            )}
            {props.subject === "건의사항" && (
              <div className="support-board__area__contents__top__paragraph">
                사용자가 직접 국방프렌즈에게 필요한 사항이나 문제점을
                건의합니다.
              </div>
            )}
            {props.subject === "문의사항" && (
              <div className="support-board__area__contents__top__paragraph">
                국방프렌즈 서비스 이용 중 궁금하신 점이 있으신가요?
              </div>
            )}
            {props.subject === "자주묻는질문" && (
              <div className="support-board__area__contents__top__paragraph">
                국방프렌즈 서비스 이용 중 자주 묻는 질문사항들을 알려드립니다.
              </div>
            )}
            <div className="support-board__area__contents__top__search">
              <input type="text" placeholder="검색어를 입력해주세요" />
              <img src="/static/icons/search.png" alt="search" />
            </div>
          </div>
          {props.supports.length > 0 ? (
            <ul className="support-board__area__contents__board parents">
              {props.supports.map((support, index) => {
                return (
                  <SupportBoardBox
                    key={`support-${index}`}
                    title={support.title}
                    date={support.date}
                    type={support.type}
                    user={support.user}
                    id={support.id}
                    index={index}
                  />
                );
              })}
            </ul>
          ) : (
            <div className="support-board__area__contents__board-nothing">
              등록된 게시물이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SupportBoard;
