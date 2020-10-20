import React from "react";

import "./ChatbotUser.scss";

const ChatbotUser = (props) => {
  return (
    <div id="ChatbotUser">
      <div className="chatbot-user__area">
        <div className="chatbot-user__area__contents parents">
          <div className="chatbot-user__area__contents__text">
            <div className="chatbot-user__area__contents__text__paragraph">
              {props.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUser;
