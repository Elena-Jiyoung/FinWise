import styled from "styled-components";

const FinancialSummary = ({ transactions, balances }) => {
  console.log("💰 Transactions Data:", transactions);
  console.log("💰 Balances Data:", balances);

  // Calculate Total Spending from Transactions
  // Ensure only expenses are summed by taking absolute values of negative transactions
  const totalSpent = transactions
  .filter(txn => txn.amount < 0) // Only expenses
  .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);


  // Aggregate Spending by Category
  const categoryBreakdown = transactions.reduce((acc, txn) => {
    const category = txn.details?.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + parseFloat(txn.amount);
    return acc;
  }, {});

  // Find Most Expensive Transaction
  const mostExpensiveTxn = transactions.reduce((max, txn) =>
    parseFloat(txn.amount) > parseFloat(max.amount) ? txn : max, transactions[0] || {}
  );

  return (
      <Container>
        <h2>Financial Summary</h2>
        <SummaryCards>
          {/* First Row */}
          <Row>
            <Card>
              <h3>💵 Ledger Balance</h3>
              <p>${balances?.ledger || "0.00"}</p>
            </Card>
            <Card>
              <h3>💰 Available Balance</h3>
              <p>${balances?.available || "0.00"}</p>
            </Card>
            <Card>
              <h3>💸 Total Spending</h3>
              <p>${totalSpent.toFixed(2)}</p>
            </Card>
          </Row>
  
          {/* Second Row */}
          <Row>
            <Card>
              <h3>📂 Top Category</h3>
              <p>{Object.keys(categoryBreakdown)[0] || "N/A"}</p>
            </Card>
            <Card>
              <h3>💳 Biggest Expense</h3>
              <p>{mostExpensiveTxn.description || `Manually entered: ${mostExpensiveTxn.category}` || "N/A"} - ${mostExpensiveTxn.amount || "0.00"}</p>
            </Card>
          </Row>
        </SummaryCards>
      </Container>
    );
  };
  
  export default FinancialSummary;
  
  // ✅ Styled Components
  const Container = styled.div`
    text-align: center;
    margin-bottom: 30px;
    width: 100%;
    margin: 0 auto;
  `;
  
  const SummaryCards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
  `;
  
  const Row = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
  
    @media (max-width: 600px) {
      flex-direction: column;
      align-items: center;
    }
  `;
  
  const Card = styled.div`
    background: #f7fafc;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    flex: 1;
    max-width: 250px;
  `;