import styled from "styled-components";

const FinancialSummary = ({ spendingSummary }) => {
  const totalSpent = Object.values(spendingSummary.monthlySpending || {}).reduce((sum, val) => sum + val, 0);
  const categoryBreakdown = spendingSummary.categoryBreakdown || {};

  return (
    <Container>
      <h2>💰 Financial Summary</h2>
      <SummaryCards>
        <Card>
          <h3>Total Spending</h3>
          <p>${totalSpent.toFixed(2)}</p>
        </Card>
        <Card>
          <h3>Top Category</h3>
          <p>{Object.keys(categoryBreakdown)[0] || "N/A"}</p>
        </Card>
      </SummaryCards>
    </Container>
  );
};

export default FinancialSummary;

// ✅ Styled Components
const Container = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const SummaryCards = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  background: #f7fafc;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
