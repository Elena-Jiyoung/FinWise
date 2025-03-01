//For users who didn’t connect their bank, this page allows manual input of financial transactions, encouraging to input three months' transactions.



import React, { useState } from "react";
import styled from "styled-components";

const ManualEntry = () => {
  const [entries, setEntries] = useState([
    { date: "", category: "", amount: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { date: "", category: "", amount: "" }]);
  };

  const removeEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Title>Manual Financial Entry</Title>
      <Subtitle>Enter transactions for the past 3 months</Subtitle>

      <Form>
        {entries.map((entry, index) => (
          <EntryRow key={index}>
            <Input
              type="date"
              value={entry.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Category (e.g., Groceries)"
              value={entry.category}
              onChange={(e) => handleChange(index, "category", e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Amount ($)"
              value={entry.amount}
              onChange={(e) => handleChange(index, "amount", e.target.value)}
              required
            />
            <RemoveButton onClick={() => removeEntry(index)}>x</RemoveButton>
          </EntryRow>
        ))}

        <AddButton onClick={addEntry}>+ Add Another Entry</AddButton>
        <SubmitButton>Save Entries</SubmitButton>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EntryRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  font-size: 1rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: red;
`;

const AddButton = styled.button`
  background: #5a67d8;
  color: white;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: background 0.3s;

  &:hover {
    background: #434190;
  }
`;

const SubmitButton = styled.button`
  background: #48bb78;
  color: white;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: background 0.3s;

  &:hover {
    background: #38a169;
  }
`;

export default ManualEntry;
