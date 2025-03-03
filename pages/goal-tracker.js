import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateContext } from "../context/StateContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link"; // ✅ For navigation

const GoalTracker = () => {
  const { userId } = useStateContext();
  const [savedAmount, setSavedAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(5000);
  const [inputAmount, setInputAmount] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchSavings = async () => {
      const savingsRef = doc(db, "users", userId, "savingsProgress");
      const snapshot = await getDoc(savingsRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        setSavedAmount(data.savedAmount || 0);
        setTargetAmount(data.targetAmount || 5000);
      }
    };

    fetchSavings();
  }, [userId]);

  const handleAddFunds = async () => {
    const amount = parseFloat(inputAmount);
    if (!amount || amount <= 0) return alert("Enter a valid amount.");

    const newSavedAmount = savedAmount + amount;
    setSavedAmount(newSavedAmount);
    setInputAmount("");

    try {
      const savingsRef = doc(db, "users", userId, "savingsProgress");
      await setDoc(savingsRef, { savedAmount: newSavedAmount, targetAmount }, { merge: true });
      console.log("✅ Savings updated!");
    } catch (error) {
      console.error("❌ Error updating savings:", error);
    }
  };

  const progressPercentage = Math.min((savedAmount / targetAmount) * 100, 100);

  return (
    <Container>
      <Section>
        <Title>🔥 Savings Progress</Title>
        <ProgressContainer>
          <ProgressBar>
            <ProgressFill progress={progressPercentage} />
          </ProgressBar>
          <ProgressText>{progressPercentage.toFixed(1)}% Complete</ProgressText>
        </ProgressContainer>
      </Section>

      <InputContainer>
        <Input
          type="number"
          placeholder="Enter amount you saved today ($)"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        />
        <AddFundsButton onClick={handleAddFunds}>➕ Add Savings</AddFundsButton>
      </InputContainer>

      {/* 🔹 Back to Dashboard Button */}
      <BackButtonContainer>
        <Link href={`/dashboard/${userId}`} passHref>
          <BackButton>⬅ Back to Dashboard</BackButton>
        </Link>
      </BackButtonContainer>
    </Container>
  );
};

export default GoalTracker;

// ✅ Styled Components
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
  width: ${({ progress }) => progress}% ;
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

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  font-size: 1rem;
  width: 200px;
  text-align: center;
`;

const AddFundsButton = styled.button`
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

const BackButtonContainer = styled.div`
  margin-top: 30px;
`;

const BackButton = styled.a`
  background: #e53e3e;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    background: #c53030;
  }
`;
