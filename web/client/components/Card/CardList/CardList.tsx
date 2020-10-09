import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import DelayLink from "../../../lib/DelayLink";
import Lee from "../../../lib/Lee";

import "./CardList.scss";

const CARD_QUERY = gql`
  query($id: ID!) {
    cards(where: { id_ne: $id }, limit: 5, sort: "date:desc") {
      id
      title
      date
      thumbnail {
        url
      }
      author
    }
  }
`;

import CardListBox from "./CardListBox/CardListBox";

function CardList(props) {
  let cards;

  const { data, loading, error } = useQuery(CARD_QUERY, {
    ssr: false,
    variables: { id: props.id },
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
    <div id="CardList">
      <div className="card-list__area">
        <div className="card-list__area__contents">
          <div className="card-list__area__contents__title">
            <DelayLink
              to={`card`}
              delay={200}
              onDelayStart={function () {
                Lee.loadingStart();
              }}
            >
              <span>최신 카드뉴스</span>
            </DelayLink>
          </div>
          <ul className="card-list__area__contents__lists parents">
            {cards.map((card, index) => {
              return (
                <li key={`card-${index}`}>
                  <CardListBox
                    id={card.id}
                    title={card.title}
                    thumbnail={card.thumbnail}
                    date={card.date}
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

export default CardList;
