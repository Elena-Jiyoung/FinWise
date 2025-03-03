import styled from "styled-components";
import Link from "next/link";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <h2>📊 Dashboard</h2>
      <NavItem href="/dashboard">🏠 Home</NavItem>
      <NavItem href="/goal-tracker">📅 Goal Tracker</NavItem>
      <NavItem href="/expenditure-summary">💰 Spending Summary</NavItem>
      <NavItem href="/connect-bank">🏦 Connect Bank</NavItem>
      <NavItem href="/manual-entry">✏️ Add Transaction</NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;

// ✅ Styled Components
const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #2d3748;
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NavItem = styled(Link)`
  color: white;
  font-size: 1.2rem;
  text-decoration: none;
  padding: 10px;
  transition: 0.3s;
  &:hover {
    background: #4a5568;
  }
`;
