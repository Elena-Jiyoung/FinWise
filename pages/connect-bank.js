//This page asks users if they want to connect their bank or manually enter financial data with TellerConnect.
//It gives users a choice between automation & manual tracking, and allows smooth navigation to relevant pages.

// 1. When the user clicks "Connect Your Bank", Teller Connect opens.
//2. After the user links their bank, Teller returns an access_token.

//https://github.com/tellerhq/teller-connect-react/tree/master

import { useState, useEffect } from "react";
import { useTellerConnect } from "teller-connect-react";
import React from "react";
import { useStateContext } from "../context/StateContext";
import styled from "styled-components";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background: #f7fafc;
`;

const Title = styled.h2`
  margin-top: 10px;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 500px;
  margin-bottom: 30px;
  color: #4a5568;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.a`
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s;
`;

const ConnectButton = styled(Button)`
  background: #48bb78;
  color: white;

  &:hover {
    background: #38a169;
  }
`;

const SkipButton = styled(Button)`
  background: #e2e8f0;
  color: #4a5568;

  &:hover {
    background: #cbd5e0;
  }
`;

//Function to connect bank account using TellerConnect
// onTokenReceived is a function that will be called when the user successfully connects their bank account
// It will receive the access token as an argument

const ConnectBank = () => {
  const { setAccessToken , userId} = useStateContext(); // Use global state for access token
  const [tellerUserId, setTellerUserId] = useState(null);

  const router = useRouter();
  
  const { open, ready, error } = useTellerConnect({
    applicationId: "app_pajjplgmmc87dmm8ee000",
    environment: 'sandbox',
    onInit: function() {
      console.log("Teller Connect has initialized");
    },
    onSuccess: async (authorization) => {
      // Save your access token here
      setAccessToken(authorization.accessToken); // Store in frontend
      // Send token to backend for secure storage
      try{
        const requestBody = {
          accessToken: authorization.accessToken,
          firebaseUserId: userId,  // Ensure this is not null
          tellerUserId: authorization.user.id
        };
        
        console.log("Request Payload:", requestBody); // Log the request payload
        const response = await fetch("http://localhost:5000/store-teller-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
        });
        const responseData = await response.json();
        console.log("Server Response:", responseData);

        // Check response correctly
        if (responseData.success === true) {
          console.log("Access token stored, navigating to Dashboard...");
          router.push("/loading"); // Redirect user
        }
    } catch (error) {
      console.error("Error storing access token:", error);
    }
    },
    onExit: () => {
      console.log("User exited Teller Connect");
    },
  });
  // Debug: Check if Teller Connect is initialized
  useEffect(() => {
    console.log("Teller Ready:", ready);
    console.log("Teller Error:", error);
  }, [ready, error]);


      
  return (

    <Container>
      <script src="https://cdn.teller.io/connect/connect.js"></script>
      <h3>Please refresh the page or log in again, then try connecting your bank.</h3>
      <Title>Would you like to connect your bank?</Title>
      <Subtitle>
        Connect your bank account securely to track expenses, set savings goals, and optimize your financial health.
      </Subtitle>
      <ButtonContainer>
        <ConnectButton onClick={() => ready && open()} disabled={!ready}>
        Connect a bank account
        </ConnectButton>
        <SkipButton href="/manual-entry">Skip for Now. I will enter manually.</SkipButton>
      </ButtonContainer>
    </Container>
  );
};

export default ConnectBank;
