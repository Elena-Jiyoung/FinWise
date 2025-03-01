import React from "react";
import Link from "next/link";
import { IoMdHome } from "react-icons/io"; // Importing home icon
import styled from "styled-components";

const Home = () => {
  return (
    <Link href="/dashboard" passHref>
      <Square aria-label="Go to Dashboard">
        <IoMdHome />
      </Square>
    </Link>
  );
};

const Square = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #007bff;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: background 0.3s, transform 0.2s;

  svg {
    width: 28px;
    height: 28px;
  }

  &:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }
`;

export default Home;
