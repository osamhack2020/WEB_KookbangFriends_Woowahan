import React from "react";
import Lee from "../../../lib/Lee";

import "./Chatbot.scss";

import ChatbotMessage from "./ChatbotMessage/ChatbotMessage";

const Chatbot = () => {
  return (
    <div id="Chatbot" className="hide invisible">
      <div className="chatbot__area">
        <div className="chatbot__area__contents parents">
          <div className="chatbot__area__contents__top parents">
            <img
              src="/static/icons/katalk.png"
              alt="kakaotalk"
              className="chatbot__area__contents__top__katalk"
            />
            <div className="chatbot__area__contents__top__title">
              국방프렌즈 헬프데스크
            </div>
            <img
              src="/static/icons/close-white.png"
              alt="close"
              className="chatbot__area__contents__top__close"
              onClick={Lee.closeChatbot}
            />
          </div>
          <div
            className="chatbot__area__contents__field parents"
            id="chatField"
          >
            <ChatbotMessage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
