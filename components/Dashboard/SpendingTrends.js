//This MonthlySpending component is used to display a bar chart showing monthly spending trends.

//Fetches spending trends from Firebase Firestore
//Uses placeholder data if API is unavailable

import { Line, Pie } from "react-chartjs-2";
import styled from "styled-components";

const SpendingTrends = ({ spendingSummary }) => {
  return (
    <Container>
      <h2>📊 Spending Trends</h2>

      {/* Line Chart: Monthly Spending */}
      <ChartContainer>
        <Line
          data={{
            labels: Object.keys(spendingSummary.monthlySpending),
            datasets: [
              {
                label: "Total Spending",
                data: Object.values(spendingSummary.monthlySpending),
                borderColor: "#3182CE",
                backgroundColor: "rgba(49, 130, 206, 0.2)",
                fill: true,
                tension: 0.4,
              },
            ],
          }}
        />
      </ChartContainer>

      {/* Pie Chart: Category Breakdown */}
      <ChartContainer>
        <Pie
          data={{
            labels: Object.keys(spendingSummary.categoryBreakdown),
            datasets: [
              {
                data: Object.values(spendingSummary.categoryBreakdown),
                backgroundColor: ["#48bb78", "#f6ad55", "#ed8936", "#fc8181", "#5a67d8"],
              },
            ],
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
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
  margin-top: 20px;
`;





// //Displays a Bar Chart using Recharts
// import React, { useState, useEffect } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
// import { db, auth } from "@/library/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// const SpendingTrends = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchSpendingData = async () => {
//       if (!auth.currentUser) return;

//       //const userRef = doc(db, "users", auth.currentUser.uid);
//       //const userSnap = await getDoc(userRef);

//     //   if (userSnap.exists() && userSnap.data().monthlySpending) {
//     //     setData(userSnap.data().monthlySpending);
//     //   } else {
//         // Placeholder Data if no API data is available
//         setData([
//           { month: "Jan", amount: 1200 },
//           { month: "Feb", amount: 900 },
//           { month: "Mar", amount: 1300 },
//           { month: "Apr", amount: 1000 },
//           { month: "May", amount: 1100 },
//           { month: "Jun", amount: 950 },
//         ]);
//       }
    

//     fetchSpendingData();
//   }, []);

//   return (
//     <div style={{ width: "100%", height: 400, textAlign: "center" }}>
//       <h2>📉 Monthly Spending</h2>
//       <ResponsiveContainer width="80%" height="80%">
//         <BarChart data={data}>

//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//             <CartesianGrid strokeDasharray="3 3" />
//             <Bar>
//             {data.map((entry, index) => (
//                 <Bar key={`bar-${index}`} dataKey="amount" fill="#0088FE" />
//             ))}
//             </Bar>
          
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SpendingTrends;
