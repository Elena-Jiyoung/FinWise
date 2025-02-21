import styled from 'styled-components';
import ChatbotIcon from "./ChatbotIcon";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(#e8e8fc, rgb(214, 200, 248));
`;

const Popup = styled.div`
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
  background: #9284f1;
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
`;

const MessageText = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  color: #333;
`;

const ChatbotFooter = styled.div`
  padding: 15px 20px;
  background: #f0f0f0;
`;

const ChatForm = styled.form`
  display: flex;
  gap: 10px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SendButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #ffffff;
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

const ChatbotPopup = () => {
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
          <ToggleButton className="material-symbols-outlined">
            keyboard_arrow_down
          </ToggleButton>
        </ChatbotHeader>
        {/* Chatbot Body */}
        <ChatbotBody>
            <ChatbotMessage>
                <IconWrapper>
                <ChatbotIcon/>
                </IconWrapper>
                <MessageText>Hi there! How can I help you today?</MessageText>
            </ChatbotMessage>
            <ChatbotMessage>
                <MessageText>
                    Sure, I'll look into it! Please wait for a moment.
                </MessageText>
            </ChatbotMessage>
        </ChatbotBody>
        {/* Chatbot Footer */}
        <ChatbotFooter>
            <ChatForm>
                <MessageInput
                type="text"
                placeholder="Write your message here..."
                required
                />
                <SendButton className="material-symbols-outlined">
                send
                </SendButton>
            </ChatForm>
        </ChatbotFooter>
        </Popup>
    </Container>
  );
};

export default ChatbotPopup;
