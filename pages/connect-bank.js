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
  const { setAccessToken } = useStateContext(); // Use global state for access token
  const router = useRouter();

  const { open, ready } = useTellerConnect({
    applicationId: "app_pajjplgmmc87dmm8ee000",
    onSuccess: async (authorization) => {
      // Save your access token here

      setAccessToken(authorization.accessToken); // Store in frontend
      // Send token to backend for secure storage
      try{
      const response = await fetch("http://localhost:5000/store-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ access_token: authorization.accessToken })
      });
      if (response.success) {
        console.log("Access token stored, navigating to Dashboard...");
        // Redirect to loading page while fetching transactions
      router.push("/loading");
      }
    } catch (error) {
      console.error("Error storing access token:", error);
    }
    },
    onExit: () => {
      console.log("User exited Teller Connect");
    },
  });


      
  return (

    <Container>
      
      <Title>Would you like to connect your bank?</Title>
      <Subtitle>
        Connect your bank account securely to track expenses, set savings goals, and optimize your financial health.
      </Subtitle>
      <ButtonContainer>
        <ConnectButton onClick={() => open()} disabled={!ready}>
        Connect a bank account
        </ConnectButton>
        <SkipButton href="/manual-entry">Skip for Now. I will enter manually.</SkipButton>
      </ButtonContainer>
    </Container>
  );
};

export default ConnectBank;
