import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./CommunityBoardBest.scss";

import CommunityBoardBestBox from "./CommunityBoardBestBox/CommunityBoardBestBox";

function CommunityBoardBest(props) {
  let bests;

  bests = props.feeds.sort((a, b) => b.user_likes.length - a.user_likes.length);
  bests = bests.slice(0, 3);

  return (
    <div id="CommunityBoardBest">
      {bests.length > 0 && (
        <div className="community-board-best__area parents">
          <div className="community-board-best__area__contents parents">
            <div className="community-board-best__area__contents__title">
              카테고리 피드 TOP 3
            </div>
            <ul className="community-board-best__area__contents__lists parents">
              {bests.map((feed, index) => {
                return (
                  <CommunityBoardBestBox
                    key={`feed-${index}`}
                    id={feed.id}
                    title={feed.title}
                    thumbnail={feed.thumbnail}
                    date={feed.date}
                    user={feed.user}
                    type={feed.type}
                    paragraph={feed.paragraph}
                    likes={feed.user_likes.length}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityBoardBest;
