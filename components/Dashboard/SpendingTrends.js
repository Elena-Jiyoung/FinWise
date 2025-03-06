import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import styled from "styled-components";
import { Chart, registerables } from "chart.js";

// Register all Chart.js components globally
Chart.register(...registerables);

const SpendingTrends = ({ transactions }) => {
  const [monthlySpending, setMonthlySpending] = useState({});
  const [categoryBreakdown, setCategoryBreakdown] = useState({});

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    console.log("📊 Processing transactions data...");

    const monthlyTotals = {};
    const categoryTotals = {};

    transactions.forEach((txn) => {
      const month = txn.date.substring(0, 7); // Extract YYYY-MM for monthly aggregation
      const category = txn.details?.category || txn.category|| "Uncategorized";
      const amount = parseFloat(txn.amount);

      // ✅ Only count expenses (negative amounts) and convert them to positive
      if (amount < 0) {
        const absAmount = Math.abs(amount);

        // Aggregate monthly spending
        if (!monthlyTotals[month]) monthlyTotals[month] = 0;
        monthlyTotals[month] += absAmount;

        // Aggregate spending by category
        if (!categoryTotals[category]) categoryTotals[category] = 0;
        categoryTotals[category] += absAmount;
      }
    });

    console.log("📆 Monthly Spending:", monthlyTotals);
    console.log("📂 Category Breakdown:", categoryTotals);

    setMonthlySpending(monthlyTotals);
    setCategoryBreakdown(categoryTotals);
  }, [transactions]);

  return (
    <Container>
      <h2>📊 Spending Trends</h2>

      {/* Bar Chart: Monthly Spending */}
      <ChartContainer>
        <h3>📆 Monthly Spending</h3>
        <Bar
          data={{
            labels: Object.keys(monthlySpending),
            datasets: [
              {
                label: "Total Spending ($)",
                data: Object.values(monthlySpending),
                backgroundColor: "rgba(49, 130, 206, 0.5)",
                borderColor: "#3182CE",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: { display: true, text: "Spending ($)" },
              },
              x: {
                title: { display: true, text: "Month" },
              },
            },
          }}
        />
      </ChartContainer>

      {/* Pie Chart: Category Breakdown */}
      <ChartContainer>
        <h3>📂 Spending by Category</h3>
        <Pie
          data={{
            labels: Object.keys(categoryBreakdown),
            datasets: [
              {
                data: Object.values(categoryBreakdown),
                backgroundColor: [
                  "#48bb78", "#f6ad55", "#ed8936", "#fc8181", "#5a67d8", "#9f7aea", "#38b2ac",
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "right" },
            },
          }}
        />
      </ChartContainer>
    </Container>
  );
};

export default SpendingTrends;

// ✅ Styled Components
const Container = styled.div`
  text-align: center;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers chart vertically */
  justify-content: center; /* Centers chart horizontally */
  text-align: center;
  height: 400px;
  width: 100%;
  max-width: 600px; /* Set a reasonable max-width */
  margin: 20px auto; /* Centers the container */
  padding: 50px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
