import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const Hero = () => {
  const router = useRouter();
  return (
    <Section>
      {/* Background Image Overlay */}
      <BackgroundImage src="/finance-desk.jpg" alt="Landing Background" />
      
      <Overlay>
        <Container>
          <HeroTextColumn>
            <Header>
              Welcome to <Highlight>FinWise!</Highlight>
            </Header>
            <SubheaderAndStarsColumn>
              <SubHeader>
                Take control of your financial future. Smart analytics, real-time tracking, and automated reports—all in one powerful platform.
              </SubHeader>
              <CTAButton onClick={() => router.push("/auth/login")}>
                Get Started For Free
              </CTAButton>
            </SubheaderAndStarsColumn>
          </HeroTextColumn>
        </Container>
      </Overlay>
    </Section>
  );
};

export default Hero;

const Section = styled.section`
  position: relative;
  background: linear-gradient(to right, #ae94ea, #805ad5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 90vh;
  width: 100%;
  margin-top: 50px;
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.18; /* Adjust transparency */
  z-index: 1;
`;

const Overlay = styled.div`
  position: relative;
  width: 100%;
  padding: 0 5%;
  z-index: 2; /* ✅ Keeps text above the background */
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0px auto;
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
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Highlight = styled.span`
  color: #b4d7fc;
  padding: 0 10px;
`;

const SubHeader = styled.h2`
  font-size: 1.2rem;
  margin-top: 15px;
`;

const SubheaderAndStarsColumn = styled.div``;

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
