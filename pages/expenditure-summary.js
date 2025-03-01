// This page "expenditure-summary" shows a summary of the user's monthly expenses with:
// A detailed spending breakdown with charts.
// Components 1. Spending Summary – Shows total monthly expenses. 
// 2.Pie Chart Placeholder – Displays category breakdown.
// 3. Bar Chart Placeholder – Shows monthly spending trends.


import React from "react";
import styled from "styled-components";
import CategoryBreakdown from "@/components/SpendingInsights/CategoryBreakdown";
import MonthlySpending from "@/components/SpendingInsights/MonthlySpending";

const Container = styled.div`
  padding: 50px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const SummaryBox = styled.div`
  padding: 20px;
  background: #f7fafc;
  border-radius: 10px;
  width: 300px;
  margin: 0 auto 30px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ChartPlaceholder = styled.div`
  height: 200px;
  background: #edf2f7;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExpenditureSummary = () => {
  return (
    <Container>
      {/* Total Monthly Expenses */}
      <Title>Total Monthly Expenses</Title>
      <SummaryBox>$2,450</SummaryBox>

      {/*  Pie Chart: Category Breakdown */}
      <Title>Spending Category Breakdown</Title>
      <ChartPlaceholder>
        <p>Pie Chart</p>
        <CategoryBreakdown />
      </ChartPlaceholder>

      {/* 📉 Bar Chart: Spending Trends */}
      <Title>Spending Trends</Title>
      <ChartPlaceholder>
        <p>Bar Chart</p>
        <MonthlySpending />
      </ChartPlaceholder>
    </Container>
  );
};

export default ExpenditureSummary;
