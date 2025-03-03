import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";
import { useStateContext } from "../context/StateContext";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

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
      await addDoc(collection(db, "users", userId, "goals"), {
        name: goal,
        targetAmount: Number(targetAmount),
        deadline,
      });

      setGoal("");
      setTargetAmount("");
      setDeadline("");
      alert("Goal saved!}");
    } catch (error) {
      console.error("❌ Error saving goal:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Set Your Financial Goal</Title>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Enter goal (e.g., Save for vacation)" value={goal} onChange={(e) => setGoal(e.target.value)} required />
          <Input type="number" placeholder="Target Amount ($)" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} required />
          <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
          <SubmitButton type="submit">Start Saving</SubmitButton>
        </Form>

        <h2>📋 Your Goals</h2>
        <ul>
          {goals.map((g) => (
            <li key={g.id}>{g.name} - ${g.targetAmount} by {g.deadline}</li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default SetGoal;
