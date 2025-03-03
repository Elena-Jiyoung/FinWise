import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import { logOut } from '@/backend/Auth';
import { useStateContext } from '@/context/StateContext';
import DashboardButton from '@/components/Layout/DashboardButton'
const Navbar = () => {
  const { user, setUser } = useStateContext()

  return (
    <Nav>
      {/* <Logo onClick={() => logOut(setUser)} href="/">FinWise</Logo> */}
      <Logo href="/">FinWise</Logo>
      <DashboardButton></DashboardButton>
      <NavLink href="/about">About</NavLink>
      <ButtonContainer>
        {!user && <><ButtonLink className="signup"  href="/auth/signup">Sign Up</ButtonLink>
        <ButtonLink className="Login" href="/auth/login">Login</ButtonLink> </>}
        
        {user && <LogoutButton onClick={() => logOut(setUser)}>Log Out</LogoutButton>}
      </ButtonContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  display:flex;
  gap: 100px;
  align-items: center;
  padding: 20px 5%;
  background-color: #fff;
  box-shadow: 0 5px 10px  rgba(0,0,0,0.05);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #2CB57C;
  text-decoration: none;
`;


const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  color: #4a5568;
  font-weight: 500;
  transition: 0.3s;

  &:hover {
    color: #5a67d8;
  }
`;


const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const ButtonLink = styled(Link)`
  padding: 10px 20px;
  font-size: 1.2rem;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  
  &.signup {
    background-color: #007bff;
    color: white;
    border: 1px solid #007bff;
  }

  &.login {
    background-color: white;
    color: #007bff;
    border: 1px solid #007bff;
  }

  &:hover {
    opacity: 0.8;
  }
`;
// const ButtonLink = styled(Link)`
//   padding: 10px 15px;
//   font-size: 1rem;
//   border-radius: 8px;
//   text-decoration: none;
//   display: inline-block;
//   text-align: center;
//   font-weight: 600;
//   transition: 0.3s;

//   ${({ variant }) => variant === "signup" && `
//     background: #007bff;
//     color: white;
//     border: 1px solid #007bff;
//     &:hover {
//     background:rgb(247, 246, 250);
//     }
//   `}

//   ${({ variant }) => variant === "login" && `
//     background: white;
//     color: #007bff;
//     border: 1px solid #007bff;
//     &:hover {
//     background: #434190;
//     }
//   `}
  
// `;

const LogoutButton = styled.button`
  padding: 10px 15px;
  background: #007bff;
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background: #434190;
  }
`;

export default Navbar;
