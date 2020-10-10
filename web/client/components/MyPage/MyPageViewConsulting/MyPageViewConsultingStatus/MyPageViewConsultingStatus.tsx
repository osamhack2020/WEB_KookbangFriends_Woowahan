import React from "react";

import "./MyPageViewConsultingStatus.scss";

const MyPageViewConsultingStatus = (props) => {
  return (
    <div id="MyPageViewConsultingStatus">
      <div
        className={`my-page-view-consulting-status__area parents ${props.status}`}
      >
        <div className="my-page-view-consulting-status__area__contents parents">
          <div className="my-page-view-consulting-status__area__contents__subject parents">
            현재 상태
          </div>
          <div
            className={`my-page-view-consulting-status__area__contents__now parents ${props.status}`}
          >
            {props.status === "accepting"
              ? "접수완료"
              : props.status === "confirmed"
              ? "확인완료"
              : props.status === "progressing"
              ? "해결중"
              : props.status === "solved"
              ? "상담완료"
              : "알수없음"}
          </div>
          <div className="my-page-view-consulting-status__area__contents__paragraph">
            {props.status === "accepting"
              ? "상담관님께 해당 내용을 전달했습니다."
              : props.status === "confirmed"
              ? "상담관님이 내용을 확인하신 상태입니다."
              : props.status === "progressing"
              ? "상담관님이 상담에 관한 내용을 처리하고 계십니다."
              : props.status === "solved"
              ? "해당 내용에 대한 상담이 완료되었습니다."
              : "알수없음"}
          </div>

          <ul className="my-page-view-consulting-status__area__contents__graph">
            <li className="my-page-view-consulting-status__area__contents__graph__box">
              <div className="my-page-view-consulting-status__area__contents__graph__box__full accepting" />
            </li>
            <li className="my-page-view-consulting-status__area__contents__graph__box">
              <div className="my-page-view-consulting-status__area__contents__graph__box__full confirmed" />
            </li>
            <li className="my-page-view-consulting-status__area__contents__graph__box">
              <div className="my-page-view-consulting-status__area__contents__graph__box__full progressing" />
            </li>
            <li className="my-page-view-consulting-status__area__contents__graph__box">
              <div className="my-page-view-consulting-status__area__contents__graph__box__full solved" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPageViewConsultingStatus;
