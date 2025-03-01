import styled from 'styled-components';
import ChatbotIcon from '../Icons/ChatbotIcon';
import React, {useEffect, useState} from 'react';
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: none;
`;

const Popup = styled.div`
  position: relative;
  width: 500px;
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 100px 0 rgb(0 0 0 / 30%),
              0 32px 64px -48px rgb(0 0 0 / 40%);
`;

const ChatbotHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background:#9284f1;
`;

const HeaderInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const LogoText = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
`;

const IconWrapper = styled.div`
  height: 35px;
  width: 35px;
  padding: 6px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: #9284f1;
`;

const ToggleButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #fff;
  font-size: 1.9rem;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: rgb(121, 103, 241);
  }


`;


const ChatbotBody = styled.div`
  height: 460px;
  overflow-y: auto;
  padding: 25px 22px;
  background: #f9f9f9;
`;

const ChatbotMessage = styled.div`
  display: flex;
  gap: 11px;
  align-items: center;
  margin-bottom: 16px;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const BotMessageBox = styled.div`
  display: flex;
  gap: 10px;
  height: auto;
  max-width: 70%;
  padding: 10px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 13px 13px 13px 3px;
  background: #d6c8f8;
`;

const UserMessageBox = styled.div`
  display: flex;
  gap: 10px;
  height: auto;
  max-width: 70%;
  padding: 10px;
  border-radius: 13px 13px 3px 13px;
  background: #9284f1;
  color: #fff;
  margin-left: auto;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
`;
const MessageIconWrapper = styled.div`
  height: 35px;
  width: 35px;
  padding: 6px;
  background: #9284f1;
  flex-shrink: 0;
  border-radius: 50%;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: #fff;`


const BotMessageText = styled.p`
  font-size: 1rem;
  display:flex;
  align-items: flex-end;
  justify-content: center;
`;
const UserMessageText = styled.p`
  font-size: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`
const ChatbotFooter = styled.div`
  padding: 15px 20px;
  background: #fff;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 15px 22px 20px;
`;

const ChatForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  outline: 1px solid #d6c8f8;
  border-radius: 35px;
`;

const MessageInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 18px;
  font-size: 1rem;
  border: none;
  outline: none;
  background: none;
  border-radius: 5px;
  font-size: 0.95rem;
  
`;

const SendButton = styled.button`

  width: 45px;
  height: 40px;
  padding: 2px;
  border-radius: 50%;
  background:  #c6bfef;
  color: #ffffff;
  font-size: 1.9rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.2s ease;
  margin-right: 10px;

  &:hover {
    background: #9284f1;
  }
`;

const ChatbotPopup = ({closeChatbot}) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const messageInput = document.querySelector(".message-input");
    messageInput.focus();
  }, [message]);
  return (
    <Container>
      <Popup>
        <ChatbotHeader>
          <HeaderInfo>
            <IconWrapper>
            <ChatbotIcon />
            </IconWrapper>
            <LogoText>FinWiseAI Chatbot</LogoText>
          </HeaderInfo>
          <ToggleButton className="material-symbols-outlined" onClick={closeChatbot}>
            keyboard_arrow_down
          </ToggleButton>
        </ChatbotHeader>
        {/* Chatbot Body */}
        <ChatbotBody>
            <ChatbotMessage>
                <BotMessageBox>
                  <MessageIconWrapper>
                  <ChatbotIcon/>
                  </MessageIconWrapper>
                  <BotMessageText>Hi there! How can I help you today?</BotMessageText>
                </BotMessageBox>
            </ChatbotMessage>
            <ChatbotMessage>
                <UserMessageBox>
                  <UserMessageText>
                      I would like to know more about the services you offer.
                  </UserMessageText>
                </UserMessageBox>
            </ChatbotMessage>
        </ChatbotBody>
        {/* Chatbot Footer */}
        <ChatbotFooter>
            <ChatForm>
                <MessageInput
                type="text"
                placeholder="Write your message here..."
                className="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                />
                {message.length >0 ?
                <SendButton className="material-symbols-outlined">
                send
                </SendButton> : <SendButton className="material-symbols-outlined" disabled>
                send </SendButton>}
            </ChatForm>
        </ChatbotFooter>
        </Popup>
    </Container>
  );
};

export default ChatbotPopup;
