import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStateContext } from "../context/StateContext";
import { db } from "@/backend/Firebase";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import Router from "next/router";
import Sidebar from "@/components/Layout/Sidebar";
const GoalTracker = () => {
  const { userId } = useStateContext();
  const [goals, setGoals] = useState([]);
  const [savings, setSavings] = useState({});
  const [inputAmounts, setInputAmounts] = useState({});

  // Fetch all goals from Firestore
  useEffect(() => {
    if (!userId) return;

    const fetchGoals = async () => {
      try {
        const goalsRef = collection(db, "users", userId, "goals");
        const snapshot = await getDocs(goalsRef);
        const userGoals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setGoals(userGoals);

        // Fetch savings data per goal
        const savingsData = {};
        for (const goal of userGoals) {
          const goalRef = doc(db, "users", userId, "goals", goal.id);
          const goalSnapshot = await getDoc(goalRef);
          if (goalSnapshot.exists()) {
            savingsData[goal.id] = goalSnapshot.data().savedAmount || 0;
          } else {
            savingsData[goal.id] = 0;
          }
        }
        setSavings(savingsData);
      } catch (error) {
        console.error("❌ Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, [userId]);

  // Handle savings input changes
  const handleInputChange = (goalId, value) => {
    setInputAmounts((prev) => ({ ...prev, [goalId]: value }));
  };

  // Handle adding savings to a specific goal
  const handleAddFunds = async (goalId, targetAmount) => {
    const amount = parseFloat(inputAmounts[goalId]);
    if (!amount || amount <= 0) return alert("Enter a valid amount.");

    const newSavedAmount = (savings[goalId] || 0) + amount;
    setSavings((prev) => ({ ...prev, [goalId]: newSavedAmount }));
    setInputAmounts((prev) => ({ ...prev, [goalId]: "" }));

    try {
      const goalRef = doc(db, "users", userId, "goals", goalId);
      await setDoc(goalRef, { savedAmount: newSavedAmount, targetAmount }, { merge: true });
      console.log("✅ Savings updated for goal:", goalId);
    } catch (error) {
      console.error("❌ Error updating savings:", error);
    }
  };

  return (
    <>
    <Sidebar/>
    <Container>
      <Title>📈 Track Your Savings</Title>

      {goals.length > 0 ? (
        goals.map((goal) => {
          const progressPercentage = Math.min((savings[goal.id] / goal.targetAmount) * 100, 100);

          return (
            <GoalSection key={goal.id}>
              <h3>{goal.name} - ${goal.targetAmount} Goal</h3>
              <ProgressContainer>
                <ProgressBar>
                  <ProgressFill progress={progressPercentage} />
                </ProgressBar>
                <ProgressText>{progressPercentage.toFixed(1)}% Complete</ProgressText>
              </ProgressContainer>
              <p>Saved: ${savings[goal.id] || 0} / ${goal.targetAmount}</p>

              <InputContainer>
                <Input
                  type="number"
                  placeholder="Enter amount ($)"
                  value={inputAmounts[goal.id] || ""}
                  onChange={(e) => handleInputChange(goal.id, e.target.value)}
                />
                <AddFundsButton onClick={() => handleAddFunds(goal.id, goal.targetAmount)}>
                  ➕ Add Savings
                </AddFundsButton>
              </InputContainer>
            </GoalSection>
          );
        })
      ) : (
        <p>🚀 No goals set yet. Start by adding one on the <strong>Set Goal</strong> page!</p>
      )}

      {/* Back to Dashboard Button */}
      <BackButtonContainer>
        <BackButton onClick={() => Router.push(`/dashboard/${userId}`)}>⬅ Back to Dashboard</BackButton>
      </BackButtonContainer>
    </Container>
    </>
  );
};

export default GoalTracker;

const Container = styled.div`
  padding: 40px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  
  @media (min-width: 1024px) {
    margin-left: 300px; /* Adjusted for Sidebar */
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 30px;
`;

const GoalSection = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: #e2e8f0;
  border-radius: 10px;
  position: relative;
  margin-bottom: 10px;
`;

const ProgressFill = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background: #48bb78;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #48bb78;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  font-size: 1rem;
  width: 150px;
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

const BackButton = styled.button`
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
