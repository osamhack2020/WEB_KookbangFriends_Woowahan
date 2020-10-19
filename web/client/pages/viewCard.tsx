import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Head from "next/head";
import Lee from "../lib/Lee";
import DelayLink from "../lib/DelayLink";

import "../styles/pages/viewCard.scss";

import CardList from "../components/Card/CardList/CardList";

const CARD_QUERY = gql`
  query($id: ID!) {
    cards(where: { id: $id }) {
      title
      date
      thumbnail {
        url
      }
      contents {
        url
      }
      author
    }
  }
`;

function ViewCard({ query }) {
  useEffect(() => {
    Lee.loadingFinish();
  });

  let card;

  const { data, loading, error } = useQuery(CARD_QUERY, {
    ssr: true,
    variables: { id: query.id },
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
    card = data.cards[0];
  }

  const date = new Date(card.date);
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
    <div id="ViewCard">
      <Head>
        <title>국방프렌즈 - 체계지원</title>
      </Head>
      <div className="view-card__area">
        <div className="view-card__area__contents">
          <div className="view-card__area__contents__top">
            <div className="view-card__area__contents__top__info parents">
              <div className="view-card__area__contents__top__info__thumbnail">
                <img
                  src={`https://osam2.kookbang.kr${card.thumbnail.url}`}
                  alt="thumbnail"
                />
              </div>
              <div className="view-card__area__contents__top__info__stat">
                <div className="view-card__area__contents__top__info__stat__title">
                  {card.title}
                </div>
                <div className="view-card__area__contents__top__info__stat__date">{`${date.getFullYear()}년 ${month}월 ${day}일`}</div>
                <div className="view-card__area__contents__top__info__stat__author">
                  {card.author}
                </div>
                <DelayLink
                  to="card"
                  delay={200}
                  onDelayStart={function () {
                    Lee.loadingStart();
                  }}
                >
                  <div className="view-card__area__contents__top__info__stat__list">
                    목록보기
                  </div>
                </DelayLink>
              </div>
            </div>
          </div>
          <ul className="view-card__area__contents__images parents">
            {card.contents.map((image, index) => {
              return (
                <li key={`image-${index}`}>
                  <img
                    src={`https://osam2.kookbang.kr${image.url}`}
                    alt="image"
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <CardList id={query.id} />
      </div>
    </div>
  );
}

ViewCard.getInitialProps = ({ query }) => {
  return { query };
};

export default ViewCard;
