import React from 'react';
import styled from 'styled-components';

const Hero = () => {
  return (
    <Section>
      <Overlay>
        <Container>
          <HeroTextColumn>
            <Header>
              Welcome to the FinWise!
              <Highlight>Start Here</Highlight>
            </Header>
            <SubheaderAndStarsColumn>
              <SubHeader>Take control of your financial future. Smart analytics, real-time tracking, and automated reports—all in one powerful platform.</SubHeader>
              <CTAButton>Get Started For Free</CTAButton>
            </SubheaderAndStarsColumn>
          </HeroTextColumn>
        </Container>
      </Overlay>
    </Section>
  );
};

const Section = styled.section`
  background: linear-gradient(to right, #6b46c1, #805ad5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 60vh;
  width: 100%;
  margin-top: 50px;
`;

const Overlay = styled.div`
width: 100%;
  padding: 0 5%;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const Header = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  width: 100%;
  martgin-top: 5px;
  margin-bottom: 10px;
`;

const Highlight = styled.span`
  color:#b4d7fc;
  padding: 0 10px;
`;

const SubHeader = styled.h2`
  font-size: 1.2rem;
  margin-top: 15px;

`;

const SubheaderAndStarsColumn = styled.div`

`;

const CTAButton = styled.button`
  padding: 12px 25px;
  background: white;
  color: #6b46c1;
  font-size: 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;
  display: inline-block;
  margin-top: 20px;

  &:hover {
    background: #e9d8fd;
  } 

`;

export default Hero;
