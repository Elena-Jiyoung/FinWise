import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "@/components/Layout/Navbar";
import { useStateContext } from "@/context/StateContext";
import { db } from "@/backend/Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Sidebar from "@/components/Layout/Sidebar";
const SetGoal = () => {
  const { userId } = useStateContext();
  const [goal, setGoal] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchGoals = async () => {
      const goalsRef = collection(db, "users", userId, "goals");
      const snapshot = await getDocs(goalsRef);
      const userGoals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGoals(userGoals);
    };

    fetchGoals();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please log in.");
  
    try {
      const newGoalRef = await addDoc(collection(db, "users", userId, "goals"), {
        name: goal,
        targetAmount: Number(targetAmount),
        deadline,
      });
  
      //Directly update goals state without re-fetching
      setGoals((prevGoals) => [
        ...prevGoals,
        { id: newGoalRef.id, name: goal, targetAmount: Number(targetAmount), deadline }
      ]);
  
      setGoal("");
      setTargetAmount("");
      setDeadline("");
      alert("Goal saved!");
    } catch (error) {
      console.error("❌ Error saving goal:", error);
    }
  };

  return (
    <>
      <Sidebar/>
      <Container>
        <Title>Set Your Financial Goal</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Enter goal (e.g., Save for vacation)" value={goal} onChange={(e) => setGoal(e.target.value)} required />
          <Input type="number" placeholder="Target Amount ($)" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required />
          <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
          <SubmitButton type="submit">Start Saving</SubmitButton>
        </Form>

        <h2>📋 Your Goals</h2>
        <GoalList>
          {goals.map((g) => (
            <GoalItem key={g.id}>{g.name} - ${g.targetAmount} by {g.deadline}</GoalItem>
          ))}
        </GoalList>
      </Container>
    </>
  );
};

export default SetGoal;
const Container = styled.div`
  max-width: 600px;
  margin-left: 450px;
  padding: 20px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 24px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 25px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const GoalList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const GoalItem = styled.li`
  background: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
`;
