import React, { useEffect } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./ViewSupportContent.scss";

import ViewSupportContentComment from "./ViewSupportContentComment/ViewSupportContentComment";

function ViewSupportContent(props) {
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

  useEffect(() => {
    console.log(props);
  });

  return (
    <div id="ViewSupportContent">
      <div className="view-support-content__area">
        <div className="view-support-content__area__contents parents">
          <div className="view-support-content__area__contents__view parents">
            <div className="view-support-content__area__contents__view__title parents">
              {props.title}
            </div>
            <div className="view-support-content__area__contents__view__date parents">
              <span className="view-support-content__area__contents__view__date__author">
                {props.author}
              </span>
              <span className="view-support-content__area__contents__view__date__day">{`${date.getFullYear()}년 ${month}월 ${day}일`}</span>
            </div>
            <div className="view-support-content__area__contents__view__description parents">
              <span
                dangerouslySetInnerHTML={{
                  __html: props.description.replace(
                    /(?:\r\n|\r|\n)/g,
                    "<br />"
                  ),
                }}
              ></span>
            </div>
            <ViewSupportContentComment
              id={props.id}
              comments={props.comments}
            />
          </div>
          <div className="view-support-content__area__contents__list parents">
            <div className="view-support-content__area__contents__list__title">
              {props.type} 최신 글
            </div>
            {props.supports.length > 0 ? (
              <ul className="view-support-content__area__contents__list__lists parents">
                {props.supports.map((support, index) => {
                  if (index < 4) {
                    const date = new Date(support.date);
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
                    if (support.title === props.title) {
                      return (
                        <DelayLink
                          key={`support-list-${index}`}
                          to={`viewSupport?type=${support.type}&id=${support.id}`}
                          delay={200}
                          onDelayStart={function () {
                            Lee.loadingStart();
                          }}
                        >
                          <li className="view-support-content__area__contents__list__lists__box parents now">
                            <div className="view-support-content__area__contents__list__lists__box__title">
                              {support.title}
                            </div>
                            <div className="view-support-content__area__contents__list__lists__box__date">
                              {`${date.getFullYear()}년 ${month}월 ${day}일`}
                            </div>
                          </li>
                        </DelayLink>
                      );
                    } else {
                      return (
                        <DelayLink
                          key={`support-list-${index}`}
                          to={`viewSupport?type=${support.type}&id=${support.id}`}
                          delay={200}
                          onDelayStart={function () {
                            Lee.loadingStart();
                          }}
                        >
                          <li className="view-support-content__area__contents__list__lists__box parents">
                            <div className="view-support-content__area__contents__list__lists__box__title">
                              {support.title}
                            </div>
                            <div className="view-support-content__area__contents__list__lists__box__date">
                              {`${date.getFullYear()}년 ${month}월 ${day}일`}
                            </div>
                          </li>
                        </DelayLink>
                      );
                    }
                  }
                })}
              </ul>
            ) : (
              <div className="view-support-content__area__contents__list__none">
                다른 글이 없습니다.
              </div>
            )}
            <DelayLink
              to={`support?type=${props.type}`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <div className="view-support-content__area__contents__list__more">
                더 보기
              </div>
            </DelayLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSupportContent;
