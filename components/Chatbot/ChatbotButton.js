// This is the ChatbotButton component: a floating button that toggles a chatbot popup to open and close. 
// The button icon changes depending on the state of the popup. 
// The ChatbotPopup component is rendered when the button is clicked. 
// The closeChatbot function is passed to the ChatbotPopup component to allow closing the popup. 
// The component uses styled-components for styling.

import React, { useState } from "react";
import styled from "styled-components";
import ChatbotPopup from "./ChatbotPopup"; 

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #9284f1;
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  &:hover {
    background: #7a6de0;
  }
`;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 500px;
  z-index: 1000;
`;

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const closeChatbot = () => {
    setIsOpen(false);
  };
  return (
    <>
      <FloatingButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖️" : "💬"} {/* Toggle button icon */}
      </FloatingButton>

      {isOpen && (
        <ChatbotContainer>
          <ChatbotPopup closeChatbot={closeChatbot} />
        </ChatbotContainer>
      )}
    </>
  );
};

export default ChatbotButton;