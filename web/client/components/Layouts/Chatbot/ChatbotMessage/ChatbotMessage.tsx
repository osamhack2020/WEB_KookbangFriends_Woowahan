import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Lee from "../../../../lib/Lee";

import "./ChatbotMessage.scss";

import ChatbotAdmin from "../ChatbotAdmin/ChatbotAdmin";
import ChatbotUser from "../ChatbotUser/ChatbotUser";
import ChatbotBox from "../ChatbotBox/ChatbotBox";

const CHATBOT_QUERY = gql`
  query($scene: String!) {
    chatbots(where: { scene: $scene }) {
      reply
      chatbot_messages {
        text
        target
      }
      button
      link
    }
  }
`;

let message = [];
let sceneIndex = 0;
let sceneText;
let scroll = 0;

const ChatbotMessage = () => {
  sceneIndex++;

  let [scene, setScene] = useState({
    target: "introduce",
    text: null,
  });

  useEffect(() => {
    const chatBox = Lee.gets(`chatBox-${sceneIndex}`);
    const chatField = Lee.get("chatField");
    const chatAdmin = Lee.gets(`chatAdmin-${sceneIndex}`);

    for (let i = 0; i < chatBox.length; i++) {
      Lee.addClass(chatBox[i], "show");
    }

    for (let j = 0; j < chatAdmin.length; j++) {
      Lee.addClass(chatAdmin[j], "active");
    }

    chatField.scrollTop = scroll - (chatField.clientHeight - 150);

    setTimeout(() => {
      chatField.scrollTo({ top: chatField.scrollHeight, behavior: "smooth" });
    }, 100);

    setTimeout(() => {
      scroll = chatField.scrollHeight;
    }, 400);
  });

  let chatbot;

  const { data, loading, error } = useQuery(CHATBOT_QUERY, {
    ssr: false,
    variables: { scene: scene.target },
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
    if (sceneText !== scene.text) {
      sceneText = scene.text;
      chatbot = data.chatbots[0];
      if (scene.text) {
        message.push(
          <ChatbotUser text={scene.text} key={`chatUser-${sceneIndex}`} />
        );
      }
      if (chatbot) {
        message.push(
          <ChatbotAdmin
            reply={chatbot.reply}
            button={chatbot.button}
            link={chatbot.link}
            key={`chatAdmin-${sceneIndex}`}
            index={sceneIndex}
          />
        );
      } else {
        message.push(
          <ChatbotAdmin
            reply="무슨 말씀인지 잘 이해하지 못했어요. 다시 시도해주세요."
            key={`chatAdmin-${sceneIndex}`}
            index={sceneIndex}
          />
        );
      }
      if (chatbot) {
        if (chatbot.chatbot_messages.length > 0) {
          chatbot.chatbot_messages.map((chatbox, index) => {
            message.push(
              <ChatbotBox
                text={chatbox.text}
                target={chatbox.target}
                setScene={setScene}
                index={sceneIndex}
                key={`chatbox-${sceneIndex}-${index}`}
              />
            );
          });
        } else {
          message.push(
            <div className="chatbot-box__area__contents__end">
              상담이 종료되었습니다.
            </div>
          );
          message.push(
            <ChatbotBox
              text="처음으로 돌아가기"
              target="introduce"
              setScene={setScene}
              index={sceneIndex}
              key={`chatbox-${sceneIndex}`}
            />
          );
        }
      } else {
        message.push(
          <div className="chatbot-box__area__contents__end">
            상담이 종료되었습니다.
          </div>
        );
        message.push(
          <ChatbotBox
            text="처음으로 돌아가기"
            target="introduce"
            setScene={setScene}
            index={sceneIndex}
            key={`chatbox-${sceneIndex}`}
          />
        );
      }
    }
  }

  return (
    <div id="ChatbotMessage">
      <div className="chatbot-message__area">{message}</div>
    </div>
  );
};

export default ChatbotMessage;
