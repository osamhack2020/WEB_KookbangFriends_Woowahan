import React from "react";

import "./MyPageViewConsultingContext.scss";

const MyPageViewConsultingContext = (props) => {
  const date = new Date(props.date);
  let month;
  let day;
  let hour;
  let minute;

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

  if (date.getHours() < 10) {
    hour = "0" + date.getHours();
  } else {
    hour = date.getHours();
  }

  if (date.getMinutes() < 10) {
    minute = "0" + date.getMinutes();
  } else {
    minute = date.getMinutes();
  }

  return (
    <div id="MyPageViewConsultingContext">
      <div className="my-page-view-consulting-context__area parents">
        <div className="my-page-view-consulting-context__area__contents parents">
          <div className="my-page-view-consulting-context__area__contents__subject">
            접수 날짜
          </div>
          <div className="my-page-view-consulting-context__area__contents__date">
            {`${date.getFullYear()}년 ${month}월 ${day}일 ${hour}시 ${minute}분`}
          </div>
          <div className="my-page-view-consulting-context__area__contents__subject">
            접수 분야
          </div>
          <div className="my-page-view-consulting-context__area__contents__type">
            {props.type}
          </div>
          <div className="my-page-view-consulting-context__area__contents__subject">
            접수 내용
          </div>
          <div className="my-page-view-consulting-context__area__contents__title">
            {props.title}
          </div>
          <div className="my-page-view-consulting-context__area__contents__description">
            <span
              dangerouslySetInnerHTML={{
                __html: props.description.replace(/(?:\r\n|\r|\n)/g, "<br />"),
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageViewConsultingContext;
