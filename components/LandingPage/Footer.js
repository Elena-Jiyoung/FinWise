import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <LeftContainer>
          © {new Date().getFullYear()} FinWise
        </LeftContainer>
        <CenterContainer>
          <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
        </CenterContainer>
        <RightContainer>
          <SocialIcon href="#" aria-label="Facebook">FB</SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">TW</SocialIcon>
          <SocialIcon href="#" aria-label="Instagram">IG</SocialIcon>
        </RightContainer>
      </FooterContainer>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  background: #2d3748;
  color: white;
  padding: 30px 10%;
  text-align: center;
  bottom: 0;
  width: 100%;
  position: absolute;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.div`
  font-size: 1rem;
`;

const CenterContainer = styled.div`
  font-size: 1rem;
`;

const RightContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const Link = styled.a`
  color: #e2e8f0;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    color: #a0aec0;
  }
`;

const SocialIcon = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  transition: 0.3s;

  &:hover {
    color: #007bff;
  }
`;

export default Footer;
