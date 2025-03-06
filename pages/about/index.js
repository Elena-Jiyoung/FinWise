import React from "react";
import Navbar from "@/components/Layout/Navbar";

import styled from "styled-components";
import CoinIcon from "@/components/Icons/CoinIcon";
import ClipboardIcon from "@/components/Icons/ClipboardIcon";
import PiggyBankIcon from "@/components/Icons/PiggyBankIcon";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin-top: 100px;
`;
const Title = styled.h1`
  color: black;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
`;


const Mission = styled.p`
  color: black;
  text-align: center;
  font-size: 1.2rem;
  max-width: 500px;
  margin: 0 auto;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Body = styled.p`
  color: black;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
  margin-bottom: 40px;
  font-weight: bold;
`;

const ContactContainer = styled.div`
  padding-top: 50px;
  padding-bottom: 30px;
`

const ContactTitle = styled.div`
  color: black;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 15px;
  margin-bottom: 20px;
`
const FeatureList = styled.ul`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 1.5rem; // Increased font size
  font-weight: bold;
`;

const HorizontalLine = styled.hr`
  border-top: 1px solid black;
  width: 100%;
`
const About = () => {
  return (
    <>

    <Navbar />
    
    <Container>
      <Title>About Us</Title>
      <Mission>We help people take control of their financial future.</Mission>
    </Container>
    <HorizontalLine></HorizontalLine>
    <Container className="container mt-5">
        <Title>Our Features</Title>
        <FeatureList className="list-group list-group-numbered">
          <li className="list-group-item"><ClipboardIcon></ClipboardIcon>Smart Financial Insights</li>
          <li className="list-group-item"><CoinIcon></CoinIcon>Expense Tracking</li>
          <li className="list-group-item"><PiggyBankIcon></PiggyBankIcon>Goal-Based Savings</li>
        </FeatureList>
        <div className="text-center mt-4">
          <a href="/dashboard" className="btn btn-primary">
            Explore More
          </a>
        </div>
      </Container>
      <HorizontalLine></HorizontalLine>
      <ContactContainer>
        <ContactTitle>Contact Us</ContactTitle>
        <Body>Email us at elenajyc3@gmail.com</Body>
      </ContactContainer>
      
    </>
  );
};

export default About;
