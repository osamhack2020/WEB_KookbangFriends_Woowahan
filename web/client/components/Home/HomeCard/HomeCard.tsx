import React from "react";
import Swiper from "react-id-swiper";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import DelayLink from "../../../lib/DelayLink";
import Lee from "../../../lib/Lee";

import "swiper/swiper.scss";
import "./HomeCard.scss";

import HomeCardBox from "./HomeCardBox/HomeCardBox";

const CARD_QUERY = gql`
  query {
    cards(sort: "date:desc", limit: 10) {
      id
      title
      date
      author
      thumbnail {
        url
      }
      contents {
        url
      }
    }
  }
`;

const params = {
  slidesPerView: 5,
  spaceBetween: 30,
  grabCursor: true,
  speed: 1000,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    769: {
      slidesPerView: 3.5,
    },
    360: {
      slidesPerView: 2.5,
      spaceBetween: 15,
      freeMode: true,
    },
    0: {
      slidesPerView: 1.5,
      spaceBetween: 15,
      freeMode: true,
    },
  },
};

const HomeCard = () => {
  let cards;

  const { data, loading, error } = useQuery(CARD_QUERY, {
    ssr: true,
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
    <div id="HomeCard">
      <div className="home-card__area parents">
        <div className="home-card__area__contents parents">
          <div className="home-card__area__contents__subject">
            <DelayLink
              to={`card`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <span>카드뉴스</span>
            </DelayLink>
          </div>
          <div className="home-card__area__contents__lists">
            <Swiper {...params}>
              {cards.map((card, index) => {
                return (
                  <div key={`card-${index}`}>
                    <HomeCardBox
                      id={card.id}
                      title={card.title}
                      date={card.date}
                      author={card.author}
                      thumbnail={card.thumbnail.url}
                    />
                  </div>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
