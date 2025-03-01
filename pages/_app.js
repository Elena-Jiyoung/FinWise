import ChatbotButton from '@/components/Chatbot/ChatbotButton';
import { createGlobalStyle } from 'styled-components'
import { StateContext } from "@/context/StateContext"
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap globally
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
    <StateContext>
      <Component {...pageProps} /> 
    </StateContext>
    <GlobalStyle />
    <ChatbotButton />
  </>

  );
}
