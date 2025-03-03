//The Dashboard is the central hub where users can see an overview of
//their financial status, savings goals, and spending trends.
//Features: 1. Shows financial summary (balance, income, expenses)
// 2. Navigation to Goal Tracker and Expenditure Summary
// 3. Quick actions: Connect Bank, Add Transactions, Export Data
import { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";

const DashboardRedirect = () => {
  const { userId } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push("/auth/login"); // Redirect to login if not authenticated
    } else {
      router.push(`/loading`); // Ensure financial data is synced first
    }
  }, [userId]);

  return <h2>🔄 Redirecting...</h2>;
};

export default DashboardRedirect;


// import React, {useEffect, useState} from "react";
// import styled from "styled-components";
// import Navbar from "@/components/Layout/Navbar";
// import DashboardButton from "@/components/Layout/DashboardButton";
// import ClipboardIcon from "@/components/Icons/ClipboardIcon";
// import { useStateContext } from "../context/StateContext";


// const Dashboard = () => {
//   const { accessToken} = useStateContext();
//   const [accounts, setAccounts] = useState([]);
  
//   useEffect(() => {
//     if (!accessToken) return;

//     const fetchAccounts = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/fetch-accounts", {
//           headers: {
//             Authorization: `Basic ${accessToken}:`,
//           },
//         });
//         const data = await response.json();
//         setAccounts(data);
//       } catch (error) {
//         console.error("Error fetching accounts:", error);
//       }
//     };

//     fetchAccounts();
//   }, [accessToken]);
//   return (
//     <>
//       <Navbar />
//       <Container>
//         <div>
//           <h1>Bank Accounts</h1>
//           {accounts.length === 0 ? (
//             <p>No accounts found. Please connect your bank.</p>
//           ) : (
//             <ul>
//               {accounts.map((acc) => (
//                 <li key={acc.id}>
//                   {acc.name} - ${acc.balance}
//                 </li>
//               ))}
//             </ul>
//           )}
//       </div>
//         {/* Financial Summary */}
//         <Section>
//           <Title>Financial Summary</Title>
//           <SummaryCards>
//             <Card>
//               <h3>Balance</h3>
//               <p>$5,320.00</p>
//             </Card>
//             <Card>
//               <h3>Income (This Month)</h3>
//               <p>$3,200.00</p>
//             </Card>
//             <Card>
//               <h3>Expenses (This Month)</h3>
//               <p>$1,450.00</p>
//             </Card>
//           </SummaryCards>
//         </Section>

//         {/* Spending Insights (Navigates to Expenditure Summary) */}
//         <Section>
//           <Title>Spending Insights</Title>
//           <ChartPlaceholder> <ClipboardIcon></ClipboardIcon> Monthly Spending Trend</ChartPlaceholder>
//           <ChartPlaceholder> Category Breakdown</ChartPlaceholder>
//           <NavLink href="/expenditure-summary">💰 View Full Report</NavLink>
//         </Section>
//         {/* 🔥 Streak & Goals (Navigates to Goal Tracker) */}
//         <Section>
//           <Title>Streak & Goals</Title>
//           <ProgressContainer>
//             <ProgressBar>
//               <ProgressFill progress={75} />
//             </ProgressBar>
//             <Streak>🔥 7-Day Streak!</Streak>
//           </ProgressContainer>
//           <NavLink href="/goal-tracker">📅 Track Your Goals</NavLink>
//         </Section>

        

//         {/* Quick Actions (Links to Connect Bank and Manual Entry) */}
//         <Section>
//           <Title>Quick Actions</Title>
//           <ActionsContainer>
//             <ActionButton href="/connect-bank"> Connect Bank</ActionButton>
//             <ActionButton href="/manual-entry">➕ Add Transaction</ActionButton>
//             <ActionButton href="#">📤 Export Data</ActionButton>
//           </ActionsContainer>
//         </Section>

//         {/* 🏙️ Gamification (Optional) */}
//         <Section>
//           <Title>City Builder</Title>
//           <GamePlaceholder>🏗️ Build your financial city!</GamePlaceholder>
//         </Section>
//       </Container>
//       <HomeButton />
//     </>
//   );
// };

// const Container = styled.div`
//   padding: 50px;
//   text-align: center;

// `;

// const Section = styled.div`
//   margin-bottom: 40px;
// `;

// const Title = styled.h2`
//   font-size: 2rem;
//   margin-bottom: 20px;
// `;

// const SummaryCards = styled.div`
//   display: flex;
//   gap: 20px;
//   justify-content: center;
// `;

// const Card = styled.div`
//   background: #f7fafc;
//   padding: 20px;
//   border-radius: 10px;
//   min-width: 150px;
//   text-align: center;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const ProgressContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ProgressBar = styled.div`
//   width: 80%;
//   height: 20px;
//   background: #e2e8f0;
//   border-radius: 10px;
//   position: relative;
// `;

// const ProgressFill = styled.div`
//   width: ${({ progress }) => progress}%;
//   height: 100%;
//   background: #48bb78;
//   border-radius: 10px;
//   transition: 0.5s;
// `;

// const Streak = styled.p`
//   font-size: 1.2rem;
//   font-weight: bold;
//   color: #48bb78;
// `;

// const ChartPlaceholder = styled.div`
//   height: 200px;
//   background: #edf2f7;
//   border-radius: 10px;
//   margin-bottom: 20px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;


// const ActionsContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 20px;
// `;

// const ActionButton = styled.a`
//   padding: 12px 25px;
//   background: #5a67d8;
//   color: white;
//   font-size: 1.2rem;
//   border-radius: 8px;
//   font-weight: bold;
//   text-decoration: none;
//   transition: 0.3s;

//   &:hover {
//     background: #434190;
//   }
// `;

// const GamePlaceholder = styled.div`
//   height: 200px;
//   background: #f7fafc;
//   border-radius: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const NavLink = styled.a`
//   display: inline-block;
//   margin-top: 15px;
//   font-size: 1.2rem;
//   font-weight: bold;
//   color: #5a67d8;
//   text-decoration: none;
//   transition: 0.3s;

//   &:hover {
//     color: #434190;
//   }
// `;

// export default Dashboard;
