import React from "react";
import Lee from "../../../../lib/Lee";

import "./ChatbotBox.scss";

const ChatbotBox = (props) => {
  function choice() {
    props.setScene({ target: props.target, text: props.text });

    const chatBox = Lee.gets(`chatBox-${props.index}`);

    for (let i = 0; i < chatBox.length; i++) {
      Lee.removeClass(chatBox[i], "show");
    }
  }

  return (
    <div
      id="ChatbotBox"
      className={`chatBox-${props.index}`}
      onClick={function () {
        choice();
      }}
    >
      <div className={`chatbot-box__area ${props.target}`}>
        <div className="chatbot-box__area__contents">
          <div className="chatbot-box__area__contents__text">{props.text}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotBox;
