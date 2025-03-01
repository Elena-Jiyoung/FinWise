//This page "goal-tracker" allows users to track their savings progress with:

// 1. A Progress Bar
// 2. An "Add Savings" Button
// 3. The City Builder Game 🎮 (Gamification element)
// Functionalities:
// Users can see their savings progress visually. 
// They manually add savings each time they save money. 
// City Builder Game makes tracking fun.

import React from "react";
import styled from "styled-components";
import { useState } from "react";
import CityBuilder from "@/components/CityBuilder/CityBuilder";
const Container = styled.div`
  padding: 50px;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const BadgesContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const Badge = styled.div`
  width: 80px;
  height: 80px;
  background: gold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 80%;
  height: 20px;
  background: #e2e8f0;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
`;

const ProgressFill = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background: #48bb78;
  border-radius: 10px;
  transition: 0.5s;
`;
const ProgressText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #48bb78;
  margin-top: 10px;
`;
const Streak = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #48bb78;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  font-size: 1rem;
  width: 500px;
  text-align: center;
  height: 50px;
`;

const AddFundsButton = styled.button`
  height: 50px;
  background: #5a67d8;
  color: white;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: 0.3s;

  &:hover {
    background: #434190;
  }
`;

const CityBuilderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: #edf2f7;
  border-radius: 10px;
`;

const GoalTracker = () => {
    const [savedAmount, setSavedAmount] = useState(1200); // Example: User saved $1200
    const [inputAmount, setInputAmount] = useState(""); // User enters amount to save
    const targetAmount = 5000; // Example target: Save $5000

    // Function to add entered amount to saved amount
    const handleAddFunds = () => {
        const amount = parseFloat(inputAmount);
        if (!isNaN(amount) && amount > 0) {
        setSavedAmount(savedAmount + amount);
        setInputAmount(""); // Clear input field
        } else {
        alert("Please enter a valid amount.");
        }
    };

    // Calculate progress percentage
    const progressPercentage = Math.min((savedAmount / targetAmount) * 100, 100);

    return (
        <Container>
        {/* 🏆 Badges Section */}
        <Section>
            <Title>Earned Badges</Title>
            <BadgesContainer>
            <Badge>💰</Badge>
            <Badge>📈</Badge>
            <Badge>🔥</Badge>
            </BadgesContainer>
        </Section>

        {/* 🔥 Progress Bar with Streaks */}
        <Section>
            <Title>Progress Tracker</Title>
            <ProgressContainer>
            <ProgressBar>
                <ProgressFill progress={progressPercentage} /> {/* 65% Progress */}
            </ProgressBar>
            <ProgressText>{progressPercentage.toFixed(1)}% Complete</ProgressText>
            <Streak>🔥 5-Day Streak!</Streak>
            </ProgressContainer>
        </Section>
        {/* ➕ Add Savings Form */}
        <InputContainer>
            <Input
                type="number"
                placeholder="Enter amount you saved today($)"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
            />
            <AddFundsButton onClick={handleAddFunds}>➕ Add Savings</AddFundsButton>
            </InputContainer>

        {/* 🏙️ City Builder Game */}
        <Section>
            <Title>City Builder Game</Title>
            <CityBuilderContainer>
            <p>Build your financial city by saving more!</p>
            <CityBuilder></CityBuilder>
            </CityBuilderContainer>
        </Section>
        </Container>
    );
};

export default GoalTracker;
