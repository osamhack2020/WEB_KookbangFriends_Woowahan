import React, { useEffect } from "react";
import Lee from "../../../lib/Lee";

import "./Right.scss";

const Right = () => {
  useEffect(() => {
    const Right = Lee.get("Right");

    setTimeout(() => {
      Lee.addClass(Right, "active");
    }, 1000);

    setTimeout(() => {
      Lee.addClass(Right, "active-chat");
    }, 1400);

    setTimeout(() => {
      Lee.removeClass(Right, "active-chat");
    }, 8000);

    setTimeout(() => {
      Lee.removeClass(Right, "active");
    }, 8300);
  }, []);

  function scrollTop() {
    window.scrollTo(0, 0);
  }

  return (
    <div id="Right">
      <div className="right__area">
        <div className="right__area__top" onClick={scrollTop}>
          <img src="/static/icons/top.png" alt="top" />
        </div>
        <div className="right__area__contents">
          <div className="right__area__contents__chatbot">
            <img src="/static/icons/chat-bot.png" alt="chatbot" />
          </div>
        </div>
        <div className="right__area__chat">
          <span>내가 도와줄게!</span>
        </div>
      </div>
    </div>
  );
};

export default Right;
