import styled from "styled-components";

const QuickActions = () => {
  return (
    <ActionsContainer>
      <ActionButton href="/connect-bank">🏦 Connect Bank</ActionButton>
      <ActionButton href="/manual-entry">➕ Add Transaction</ActionButton>
    </ActionsContainer>
  );
};

export default QuickActions;

// ✅ Styled Components
const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const ActionButton = styled.a`
  padding: 12px 25px;
  background: #5a67d8;
  color: white;
  font-size: 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    background: #434190;
  }
`;
