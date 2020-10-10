import React from "react";
import Lee from "../../../../lib/Lee";
import DelayLink from "../../../../lib/DelayLink";

import "./MyPageConsultingBox.scss";

function MyPageConsultingBox(props) {
  const date = new Date(props.date);
  let month;
  let day;

  if (date.getMonth() + 1 < 10) {
    month = "0" + (date.getMonth() + 1);
  } else {
    month = date.getMonth() + 1;
  }

  if (date.getDate() < 10) {
    day = "0" + date.getDate();
  } else {
    day = date.getDate();
  }

  return (
    <li className="my-page-consulting-box__area">
      <DelayLink
        to={`mypage?type=viewConsulting&id=${props.id}`}
        delay={200}
        onDelayStart={function () {
          Lee.loadingStart();
        }}
      >
        <div className="my-page-consulting-box__area__contents">
          <div className="my-page-consulting-box__area__contents__pro parents">
            <div className="my-page-consulting-box__area__contents__pro__thumbnail">
              <img
                src={`https://osam2.kookbang.kr${props.pro.thumbnail.url}`}
                alt="thumbnail"
              />
            </div>
            <div className="my-page-consulting-box__area__contents__pro__name">
              <span>{props.pro.username}</span> 전문상담관님이
              <br />
              당신의 고민을 해결해드립니다.
            </div>
          </div>
          <div className="my-page-consulting-box__area__contents__info parents">
            <div className="my-page-consulting-box__area__contents__info__date">
              {props.type}
              <span>{`${date.getFullYear()}년 ${month}월 ${day}일`}</span>
            </div>
            <div className="my-page-consulting-box__area__contents__info__title">
              {props.title}
            </div>
            <div className="my-page-consulting-box__area__contents__info__view">
              <span>자세히 보기</span>
              <img src="/static/icons/right-arrow.png" alt="view" />
            </div>
            <div
              className={`my-page-consulting-box__area__contents__info__stat ${props.status}`}
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
          </div>
        </div>
      </DelayLink>
    </li>
  );
}

export default MyPageConsultingBox;
