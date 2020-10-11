import React from "react";
import Masonry from "react-masonry-css";
import "./CommunityBoard.scss";

import CommunityBoardBox from "./CommunityBoardBox/CommunityBoardBox";

function CommunityBoard(props) {
  return (
    <div id="CommunityBoard">
      <div className="community-board__area parents">
        <div className="community-board__area__contents parents">
          {props.feeds.length > 0 ? (
            <ul className="community-board__area__contents__board parents">
              <Masonry
                breakpointCols={1}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {props.feeds.map((feed, index) => {
                  return (
                    <CommunityBoardBox
                      key={`feed-${index}`}
                      title={feed.title}
                      thumbnail={feed.thumbnail}
                      date={feed.date}
                      user={feed.user}
                      type={feed.type}
                      paragraph={feed.paragraph}
                    />
                  );
                })}
              </Masonry>
            </ul>
          ) : (
            <div className="community-board__area__contents__board-nothing">
              등록된 게시물이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityBoard;
