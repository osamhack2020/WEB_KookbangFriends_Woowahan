import React, { useEffect } from "react";
import Router from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Head from "next/head";
import Lee from "../lib/Lee";

import "../styles/pages/viewSupport.scss";

import ViewSupportContent from "../components/ViewSupport/ViewSupportContent/ViewSupportContent";
import ViewSupportMenu from "../components/ViewSupport/ViewSupportMenu/ViewSupportMenu";

const SUPPORT_QUERY = gql`
  query($type: String!) {
    supports(where: { type: $type }, sort: "date:desc") {
      id
      title
      date
      type
      description
      user {
        username
      }
      support_comments(sort: "createdAt:asc") {
        id
        user {
          id
          username
          thumbnail {
            url
          }
          avatar
        }
        description
        createdAt
      }
    }
  }
`;

function ViewSupport({ query }) {
  useEffect(() => {
    if (
      query.type === "공지사항" ||
      query.type === "건의사항" ||
      query.type === "문의사항" ||
      query.type === "자주묻는질문"
    ) {
      Lee.loadingFinish();
    } else {
      Router.push("support?type=공지사항");
    }
  });

  let checkID = false;
  let support;
  let supports;

  const { data, loading, error } = useQuery(SUPPORT_QUERY, {
    ssr: true,
    variables: { type: query.type },
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

    for (let i = 0; i < supports.length; i++) {
      if (supports[i].id === query.id) {
        support = supports[i];
        checkID = true;
      }
    }

    if (!checkID) {
      if (typeof window !== "undefined") {
        alert("게시글이 존재하지 않습니다.");
        Router.push("support?type=공지사항");
      }
    }
  }

  return (
    <div id="ViewSupport">
      <Head>
        <title>국방프렌즈 - 체계지원</title>
      </Head>
      {checkID && (
        <div className="view-support__area">
          <div className="view-support__area__contents">
            <ViewSupportMenu type={support.type} />
            <ViewSupportContent
              id={support.id}
              title={support.title}
              type={support.type}
              description={support.description}
              date={support.date}
              author={support.user.username}
              supports={supports}
              comments={support.support_comments}
            />
          </div>
        </div>
      )}
    </div>
  );
}

ViewSupport.getInitialProps = ({ query }) => {
  return { query };
};

export default ViewSupport;
