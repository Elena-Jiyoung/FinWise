import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStateContext } from "../../context/StateContext";
import SpendingTrends from "../../components/Dashboard/SpendingTrends";
import FinancialSummary from "../../components/Dashboard/FinancialSummary";
import Sidebar from "../../components/Layout/Sidebar";
import QuickActions from "../../components/Dashboard/QuickActions";
import styled from "styled-components";
import Link from "next/link";

const Dashboard = () => {
  const { accessToken, userId, user } = useStateContext();
  const router = useRouter();
  const [spendingSummary, setSpendingSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingsProgress, setSavingsProgress] = useState({ savedAmount: 0, targetAmount: 5000 });

  useEffect(() => {
    if (!accessToken || !userId) return;
    const fetchData = async () => {
        try {
          console.log("📊 Fetching spending summary...");
          const summaryRes = await fetch(`http://localhost:5000/get-spending-summary/${userId}`);
          const summaryData = await summaryRes.json();
          setSpendingSummary(summaryData);
  
          console.log("📑 Fetching transactions...");
          const transactionsRes = await fetch(`http://localhost:5000/fetch-transactions/${userId}`);
          const transactionsData = await transactionsRes.json();
          setTransactions(transactionsData);
        } catch (error) {
          console.error("❌ Error fetching dashboard data:", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchSavings = async () => {
        const savingsRef = doc(db, "users", userId, "savingsProgress");
        const snapshot = await getDoc(savingsRef);
        if (snapshot.exists()) {
          setSavingsProgress(snapshot.data());
        }
        setLoading(false);
      };
  
      
  
      fetchData();
      fetchSavings();
    }, [userId]);
  
    if (loading) return <h2>🔄 Loading your financial dashboard...</h2>;
  
  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <h1>Welcome, {user.email}!</h1>
        <FinancialSummary spendingSummary={spendingSummary} />
        <SpendingTrends spendingSummary={spendingSummary} />
        <QuickActions />
        <GoalButtonContainer>
        <Link href={`/goal-tracker`} passHref>
          <GoalButton>🎯 Track Savings Goals</GoalButton>
        </Link>
      </GoalButtonContainer>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;

// ✅ Styled Components
const DashboardContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  margin-left: 260px;
  padding: 50px;
  text-align: center;
`;

const GoalButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const GoalButton = styled.a`
  background: #5a67d8;
  color: white;
  padding: 12px 20px;
  font-size: 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    background: #434190;
  }
`;