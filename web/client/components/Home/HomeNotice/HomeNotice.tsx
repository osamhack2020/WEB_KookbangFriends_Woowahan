import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";

import "./HomeNotice.scss";

const SUPPORT_QUERY = gql`
  query {
    supports(where: { type: "공지사항" }, limit: 3, sort: "date:desc") {
      id
      title
      date
      type
      description
    }
  }
`;

const HomeNotice = () => {
  let supports;

  const { data, loading, error } = useQuery(SUPPORT_QUERY, {
    ssr: false,
  });

  if (loading) {
    return null;
  }

  if (error) {
    if (JSON.stringify(error.graphQLErrors[0].message) === '"Forbidden"') {
      return <p>권한이 없습니다.</p>;
    } else {
      return <p>Error: {JSON.stringify(error)}</p>;
    }
  }

  if (data) {
    supports = data.supports;
  }

  function convertDate(target) {
    const date = new Date(target);
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

    return `${date.getFullYear()}년 ${month}월 ${day}일`;
  }

  return (
    <div id="HomeNotice">
      <div className="home-notice__area parents">
        <div className="home-notice__area__contents parents">
          <div className="home-notice__area__contents__latest">
            <div className="home-notice__area__contents__latest__subject">
              <DelayLink
                to="support?type=공지사항"
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <span>공지사항</span>
              </DelayLink>
            </div>
            <div className="home-notice__area__contents__latest__title">
              <DelayLink
                to={`viewSupport?type=${supports[0].type}&id=${supports[0].id}`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <span>{supports[0].title}</span>
              </DelayLink>
              <span className="home-notice__area__contents__latest__title-new">
                N
              </span>
            </div>
            <div className="home-notice__area__contents__latest__date">
              <DelayLink
                to={`viewSupport?type=${supports[0].type}&id=${supports[0].id}`}
                delay={200}
                onDelayStart={function () {
                  Lee.loadingStart();
                }}
              >
                <span>{convertDate(supports[0].date)}</span>
              </DelayLink>
            </div>
          </div>
          <div className="home-notice__area__contents__more">
            {supports[1] && (
              <ul className="home-notice__area__contents__more__lists">
                <li>
                  <DelayLink
                    to={`viewSupport?type=${supports[1].type}&id=${supports[1].id}`}
                    delay={200}
                    onDelayStart={function () {
                      Lee.loadingStart();
                    }}
                  >
                    <div className="home-notice__area__contents__more__lists__title">
                      {supports[1].title}
                    </div>
                    <div className="home-notice__area__contents__more__lists__date">
                      {convertDate(supports[1].date)}
                    </div>
                  </DelayLink>
                </li>

                {supports[2] && (
                  <li>
                    <DelayLink
                      to={`viewSupport?type=${supports[2].type}&id=${supports[2].id}`}
                      delay={200}
                      onDelayStart={function () {
                        Lee.loadingStart();
                      }}
                    >
                      <div className="home-notice__area__contents__more__lists__title">
                        {supports[2].title}
                      </div>
                      <div className="home-notice__area__contents__more__lists__date">
                        {convertDate(supports[2].date)}
                      </div>
                    </DelayLink>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNotice;
