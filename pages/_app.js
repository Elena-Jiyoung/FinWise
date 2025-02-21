import ChatbotPopup from "@/components/Chatbot/ChatbotPopup";
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", serif;
}

`
export default function App({ Component, pageProps }) {
  return (
  
  <>
    <Component {...pageProps} /> 
    <GlobalStyle />
    <ChatbotPopup />
  </>

  );
}
