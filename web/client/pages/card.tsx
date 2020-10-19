import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Head from "next/head";
import Lee from "../lib/Lee";

import "../styles/pages/card.scss";

import CardBox from "../components/Card/CardBox/CardBox";

const CARD_QUERY = gql`
  query {
    cards(sort: "date:desc") {
      id
      title
      date
      thumbnail {
        url
      }
    }
  }
`;

function Card() {
  useEffect(() => {
    Lee.loadingFinish();
  });

  let cards;

  const { data, loading, error } = useQuery(CARD_QUERY, {
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
    cards = data.cards;
  }

  return (
    <div id="Card">
      <Head>
        <title>국방프렌즈 - 카드뉴스</title>
      </Head>
      <div className="card__area parents">
        <div className="card__area__video parents">
          <video autoPlay loop muted playsInline className="pc">
            <source src="/static/videos/card-video.webm" type="video/webm" />
            <source src="/static/videos/card-video.mp4" type="video/mp4" />
          </video>
          <video autoPlay loop muted playsInline className="mobile">
            <source
              src="/static/videos/card-video-mobile.webm"
              type="video/webm"
            />
            <source
              src="/static/videos/card-video-mobile.mp4"
              type="video/mp4"
            />
          </video>
          <div className="card__area__video__fade"></div>
          <div className="card__area__video__contents">
            <div className="card__area__video__contents__title">
              <span>카드뉴스</span>
              <br />
              자랑스런 우리의 국방 소식을
              <br />
              카드뉴스로 전해드립니다.
            </div>
            <img
              src="/static/icons/chat-bot.png"
              alt="bi"
              className="card__area__video__contents__bi"
            />
            <div className="card__area__video__contents__scroll mobile">
              <img src="/static/icons/bottom-arrow.png" alt="scroll" /> 스크롤
              해서 더 알아보세요!
            </div>
          </div>
        </div>
        <div className="card__area__contents parents">
          <ul className="card__area__contents__lists parents">
            {cards.map((card, index) => {
              return (
                <li key={`card-${index}`}>
                  <CardBox
                    thumbnail={card.thumbnail}
                    title={card.title}
                    date={card.date}
                    id={card.id}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
