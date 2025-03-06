import styled from "styled-components";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext"; // Import global state context
import {useRouter} from "next/router";
const Sidebar = () => {
    const router = useRouter();
  const { setUserId, setManualTransactions, setDashboardData } = useStateContext();

  const handleLogout = () => {
    // Clear user-related global state
    setUserId(null);
    setManualTransactions([]);
    setDashboardData({ accounts: [], transactions: {}, balances: {} });

    // Redirect to landing page
    router.push("/");
  };
  return (
    <SidebarContainer>
      <h2 href="/">🍀 FinWise Dashboard</h2>
      <NavItem href="/dashboard">🏠 Home</NavItem>
      <NavItem href="/connect-bank">🏦 Connect Bank</NavItem>
      <NavItem href="/manual-entry">✏️ Add Transaction</NavItem>
      <NavItem href="/set-goal">🎯 Set your goal</NavItem>
      <NavItem href="/goal-tracker">📅 Goal Tracker</NavItem>
      <LogoutButton onClick={handleLogout}>🚪 Logout</LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #b4d7fc;
  color:rgb(67, 80, 94);
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NavItem = styled(Link)`
  color: black;
  font-size: 1.2rem;
  text-decoration: none;
  padding: 10px;
  transition: 0.3s;
  &:hover {
    background:rgb(127, 152, 180);
  }
`;
const LogoutButton = styled.button`
  margin-top: auto;
  background: #fc8181;
  color: white;
  font-size: 1.2rem;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 5px;

  &:hover {
    background: #e53e3e;
  }
`;
