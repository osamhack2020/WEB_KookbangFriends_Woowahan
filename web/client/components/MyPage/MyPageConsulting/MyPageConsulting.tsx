import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import DelayLink from "../../../lib/DelayLink";
import Lee from "../../../lib/Lee";

import "./MyPageConsulting.scss";

const CONSULTING_QUERY = gql`
  query {
    me {
      user {
        consultings_rec {
          id
          title
          type
          createdAt
          status
          professional {
            username
            thumbnail {
              url
            }
          }
        }
      }
    }
  }
`;

import MyPageConsultingBox from "./MyPageConsultingBox/MyPageConsultingBox";

const MyPageConsulting = (props) => {
  let consultings;

  const { data, loading, error } = useQuery(CONSULTING_QUERY, {
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
    consultings = data.me.user.consultings_rec;
  }

  return (
    <div id="MyPageConsulting">
      <div className="my-page-consulting__area parents">
        <div className="my-page-consulting__area__contents parents">
          <div className="my-page-consulting__area__contents__title">
            나의 상담내역
          </div>
          <DelayLink
            to={`consultingList`}
            delay={200}
            onDelayStart={function () {
              Lee.loadingStart();
            }}
          >
            <div className="my-page-consulting__area__contents__button">
              상담하기
            </div>
          </DelayLink>
          {consultings.length > 0 ? (
            <ul className="my-page-consulting__area__contents__lists">
              {consultings.map((consulting, index) => {
                return (
                  <MyPageConsultingBox
                    key={`consulting-${index}`}
                    id={consulting.id}
                    title={consulting.title}
                    type={consulting.type}
                    status={consulting.status}
                    date={consulting.createdAt}
                    pro={consulting.professional}
                  />
                );
              })}
            </ul>
          ) : (
            <div className="my-page-consulting__area__contents__none">
              상담 내역이 존재하지 않습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageConsulting;
