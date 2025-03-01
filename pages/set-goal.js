//This page "set-goal" allows users to define financial goals before tracking them in Goal Tracker.


import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "@/components/Dashboard/Navbar";

const SetGoal = () => {
  const [goal, setGoal] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    //Stops page refresh on form submit
    e.preventDefault();
    //Displays a popup alert with the user's input values.
    alert(`Goal Set: ${goal} - $${targetAmount} by ${deadline}`);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Set Your Financial Goal</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your goal (e.g., Save for vacation)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Target Amount ($)"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />
          <Input
            type="date"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <SubmitButton type="submit">Start Saving</SubmitButton>
        </Form>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 80px auto;
  padding: 30px;
  background: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  background: #48bb78;
  color: white;
  padding: 12px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: 0.3s;

  &:hover {
    background: #38a169;
  }
`;

export default SetGoal;
