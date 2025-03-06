import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useStateContext } from "../context/StateContext";
import { db } from "@/backend/Firebase";
import { doc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

const ManualEntry = () => {
  const { userId, accountId, manualTransactions, setManualTransactions } = useStateContext();
  const [entries, setEntries] = useState([{ date: "", category: "", amount: "" }]);
  const [savedTransactions, setSavedTransactions] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (!userId) return;

    const fetchTransactions = async () => {
      try {
        const txnRef = collection(db, "users", userId, "transactions");
        const snapshot = await getDocs(txnRef);
        const userTxns = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setManualTransactions(userTxns); // ✅ Update global state
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [userId]); // ✅ Only fetch when userId changes

  // Handle Input Changes
  const handleChange = (idx, field, value) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry, i) => (i === idx ? { ...entry, [field]: value } : entry))
    );
  };

  // Handle Adding a New Entry
  const addNewEntry = () => {
    setEntries([...entries, { date: "", category: "", amount: "" }]);
  };

  // Handle Deleting a Saved Transaction
  const deleteSavedTransaction = async (txnId) => {
    if (!userId) return;
    try {
      await deleteDoc(doc(db, "users", userId, "transactions", txnId));
      setManualTransactions((prevTxns) => prevTxns.filter((txn) => txn.id !== txnId));
    } catch (error) {
      console.error("❌ Error deleting transaction:", error);
    }
  };

  // Handle Submitting Transactions
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please log in.");

    try {
      const txnRef = collection(db, "users", userId, "transactions");
      const newTransactions = [];

      for (const entry of entries) {
        const newTxnRef = await addDoc(txnRef, {
          date: entry.date,
          category: entry.category,
          amount: Number(entry.amount),
          accountId: accountId || "manual_entry_account",
        });

        newTransactions.push({ id: newTxnRef.id, ...entry, accountId: accountId || "manual_entry_account" });
      }

      // ✅ Refresh the state with latest transactions
      setManualTransactions((prevTxns) => [...prevTxns, ...newTransactions]);

      setEntries([{ date: "", category: "", amount: "" }]); // ✅ Reset input fields
      alert("Transactions saved!");
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <Container>
      <Title>Manual Financial Entry</Title>
      <Subtitle>Enter transactions for the past 3 months</Subtitle>

      <Form>
        {entries.map((entry, index) => (
          <EntryRow key={index}>
            <Input type="date" value={entry.date} onChange={(e) => handleChange(index, "date", e.target.value)} required />
            <Input type="text" placeholder="Category (e.g., Groceries)" value={entry.category} onChange={(e) => handleChange(index, "category", e.target.value)} required />
            <Input type="number" placeholder="Amount ($)" value={entry.amount} onChange={(e) => handleChange(index, "amount", e.target.value)} required />
            {entries.length > 1 && <DeleteButton onClick={() => deleteEntry(index)}>🗑</DeleteButton>}

          </EntryRow>
        ))}
        <ButtonsContainer>
          <AddEntryButton type="button" onClick={addNewEntry}>➕ Add Entry</AddEntryButton>
          <SubmitButton type="submit" onClick={handleSubmit}>💾 Save Entries</SubmitButton>
        </ButtonsContainer>
      </Form>

      <SavedTransactionsContainer>
        <h2>📋 Saved Transactions</h2>
        {manualTransactions.length > 0 ? (
          <TransactionTable>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount ($)</th>
                <th>🗑 Delete</th>

              </tr>
            </thead>
            <tbody>
              {manualTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.date}</td>
                  <td>{txn.category}</td>
                  <td>${Number(txn.amount).toFixed(2)}</td>
                  <td>
                    <DeleteButton onClick={() => deleteSavedTransaction(txn.id)}>🗑</DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </TransactionTable>
        ) : (
          <p>No transactions recorded yet.</p>
        )}

        <LoadingPageButton onClick={()=>router.push('/loading')}>Continue to load your financial dashboard</LoadingPageButton>
      </SavedTransactionsContainer>
    </Container>
  );
};

export default ManualEntry;

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

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
`;

const AddEntryButton = styled.button`
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

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: red;
`;

const SavedTransactionsContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #f7fafc;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.05);
`;

const TransactionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    border-bottom: 1px solid #cbd5e0;
    padding: 8px;
    text-align: center;
  }

  th {
    background: #edf2f7;
  }
`;

const LoadingPageButton = styled.button`
  margin-top: 30px;
  margin-bottom: 10px;
  background-color: #b4d7fc;
  color: black;
  text-align: center;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: background 0.3s;

  &:hover {
    background:rgb(95, 117, 141);
  }
`