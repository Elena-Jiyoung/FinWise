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
  min-width: 300px;
  min-height: 400px;
  max-width: 150vw;
  max-height: 90vh;
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 100px 0 rgb(0 0 0 / 30%),
              0 32px 64px -48px rgb(0 0 0 / 40%);
  display: flex;
  flex-direction: column;
  resize: both;  /* Enables resizing */
  overflow: auto; /* Prevents content from being hidden */
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
  flex: 1; /* Makes the chat area expand */
  overflow-y: auto;
  padding: 25px 22px;
  background: #f9f9f9;
  min-height: 250px; /* Ensures it doesn't collapse completely */
`;

const ChatbotFooter = styled.div`
  padding: 15px 20px;
  background: #fff;
  width: 100%;
  bottom: 0;
  position: relative;
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
  background:rgb(182, 172, 241);
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
  const [messageInput, setMessageInput] = useState("");  // Track input field separately
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([{
    message: "Hello, I'm your FinWise AI assistant! How can I help you today?",
    sender: "ChatGPT"
  }]);
  

  const handleSend = async () => {
    if (!messageInput.trim()) return;  // Avoid empty messages

    const newMessage = {
      message: messageInput,
      sender: "user"
    } 
    // update our message state
    setMessages((prev) => [...prev, newMessage]);
    setMessageInput(""); // Clear input field
    
    // set a typing indicator (Chatgpt is typing)
    setTyping(true);
    // process message to ChatGPT (send it over and see the response)
    await processMessageToChatGPT([...messages, newMessage]); // all old messages + newMessage
}

  async function processMessageToChatGPT(chatMessages) {
    //chatMessages { sender: "user" or "ChatGPT", message: "The message content here"}
    // make(translate) new apiMessages {role: "user" or "assistant", content: "The message content here"}
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender == "ChatGPT") {
        role = "assistant"
      } else {
        role = "user"
      }
      return {role: role, content: messageObject.message}
    })

    // role: user -> a message from the user, "assistant" -> a response from chatGPT
    // system -> generally one initial message defining HOW we want ChatGPT to talk

    const systemMessage = {
      role: "developer",
      content: "Speak like a finance assistant. Explain like I'm a 15 years old."
    }

    const apiRequestBody = {
      "model": "gpt-4o-mini",
      "messages": [
        systemMessage,
        ...apiMessages //[message1, message2, message3, ...]
      ],
    
    }
    console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY)
    try{
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      const data = await response.json();

      if (response.ok && data.choices) {
        setMessages([...chatMessages, { message: data.choices[0].message.content, sender: "ChatGPT" }]);
        setTyping(false);
      } else {
        console.error("Chatbot API Error:", data);
      }
    } catch (error) {
      console.error("Network or API error:", error);
    } finally {
      setTyping(false);
    }
  }

  useEffect(() => {
    const chatBody = document.querySelector(".chat-body");
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }, [messages]);
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
        <ChatbotBody className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "70%",
                padding: "10px",
                borderRadius: msg.sender === "user"? "13px 13px 3px 13px" : "13px 13px 13px 3px",
                background: msg.sender === "user" ? "#9284f1" : "#d6c8f8",
                color: msg.sender === "user" ? "#fff" : "#000",
                margin: "15px"
              }}>
                {msg.message}
              </div>
            </div>
          ))}
          {typing && <div style={{ color: "#9284f1", marginTop: "10px" }}>ChatGPT is typing...</div>}
        </ChatbotBody>

        {/* Chatbot Footer */}
        <ChatbotFooter>
          <ChatForm onSubmit={(e) => { e.preventDefault(); handleSend(); }}>                
            <MessageInput
                type="text"
                placeholder="Write your message here..."
                className="message-input"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                required
                />

                <SendButton className="material-symbols-outlined" disabled={!messageInput.trim()} onClick={handleSend}>
                send
                </SendButton>
            </ChatForm>
        </ChatbotFooter>
        </Popup>
    </Container>
  );
};

export default ChatbotPopup;
