// Dashboard Page: Central hub where users can see their spending trends and financial summary
// and navigate to other features including setting goals, tracking goals, and add transactions manually.
import { useState, useEffect } from "react";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/router";
import FinancialSummary from "../../components/Dashboard/FinancialSummary";
import SpendingTrends from "../../components/Dashboard/SpendingTrends";
import Sidebar from "../../components/Layout/Sidebar";
import QuickActions from "../../components/Dashboard/QuickActions";
import styled from "styled-components";

const Dashboard = () => {
  const { userId, setAccountId, dashboardData, manualTransactions, setManualTransactions } = useStateContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState({});
  console.log("Dashboard Data loaded: ", dashboardData)
  const hasBankLinked = dashboardData?.accounts?.length > 0;

  // Extract transactions from all accounts and flatten into a single array
  const tellerTransactions = dashboardData?.transactions
  ? Object.values(dashboardData.transactions).flat()
  : [];

  // Merge TellerConnect transactions with manually entered transactions
  const allTransactions = [...tellerTransactions, ...manualTransactions];
  
  // Set initial account when dashboardData is available
  useEffect(() => {
    if (!hasBankLinked) {
      console.log("⚠ No bank linked. Skipping account selection.");
      setLoading(false);
      return;
    }

    if (dashboardData?.accounts?.length > 0) {
      const firstAccount = dashboardData.accounts[0].id;
      console.log(firstAccount)
      setAccountId(firstAccount)
      setSelectedAccount(firstAccount);
      setLoading(false);
    } else {
      setSelectedAccount("manual_entry_account");
    }
  }, [dashboardData]);

  useEffect(() => {
    if (!hasBankLinked || !selectedAccount) return;
    // ✅ Get TellerConnect transactions for selected account
  const tellerTransactions = dashboardData.transactions[selectedAccount] || [];

  // ✅ Get manual transactions only for the selected account
  const manualTxnsForAccount = manualTransactions.filter(
    (txn) => txn.accountId === selectedAccount
  );

  // ✅ Merge both transaction lists
  const mergedTransactions = [...tellerTransactions, ...manualTxnsForAccount];

  setTransactions(mergedTransactions);
  setBalances(dashboardData.balances?.[selectedAccount] || {});
}, [selectedAccount, dashboardData, manualTransactions]); // ✅ Now listens for manualTransactions updates

  if (loading) return <h2>🔄 Loading financial data...</h2>;

  return (
    <DashboardContainer>
      <Sidebar />
      <MainContent>
        <Header>Welcome to Your Dashboard</Header>
        {hasBankLinked ? (
          <AccountTitle>Account: {dashboardData.accounts[0].name} ({dashboardData.accounts[0].institution.name})</AccountTitle>
        ) : (
          <AccountTitle>📂 No Bank Linked - Viewing Manual Transactions</AccountTitle>
        )}
        {/* Financial Summary & Spending Trends */}
        <FinancialSummary transactions={allTransactions} balances={balances} />
        <SpendingTrends transactions={allTransactions} />
        {/* <QuickActions /> */} 
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh; /* Ensures full-page height */
  background: #f4f7fc; /* Light background for better contrast */
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 260px; /* Leaves space for Sidebar */
  padding: 50px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto; /* Centers content */
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 30px;
  }
`;

const Header = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 20px;
`;

const AccountTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 30px;
  background: #e2e8f0;
  padding: 15px;
  border-radius: 8px;
  display: inline-block;
`;

