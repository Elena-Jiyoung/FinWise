import React from "react";
import Navbar from "@/components/Layout/Navbar";

import styled from "styled-components";



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
  margin-top: 20px;
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
  margin-bottom: 20px;
  font-weight: bold;
`;

const FeatureList = styled.ul`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.5rem; // ✅ Increased font size
  font-weight: bold;
`;

const HorizontalLine = styled.hr`
  border-top: 1px solid black;
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
          <li className="list-group-item">📊 Smart Financial Insights</li>
          <li className="list-group-item">💰 Expense Tracking</li>
          <li className="list-group-item">🎯 Goal-Based Savings</li>
        </FeatureList>
        <div className="text-center mt-4">
          <a href="/dashboard" className="btn btn-primary">
            Explore More
          </a>
        </div>
      </Container>
      <HorizontalLine></HorizontalLine>
      <Container>
        <Title>Contact Us</Title>
        <Body>Email us at elenajyc3@gmail.com</Body>
      </Container>
      
    </>
  );
};

export default About;
