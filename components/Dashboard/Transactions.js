// import React from "react";
// import styled from "styled-components";

// const Transactions = ({ transactions }) => {
//   return (
//     <Container>
//       <Title>Recent Transactions</Title>
//       <TransactionList>
//         {transactions.length === 0 ? (
//           <p>No transactions found.</p>
//         ) : (
//           transactions.slice(0, 5).map((transaction, index) => (
//             <TransactionItem key={index}>
//               <Date>{new Date(transaction.date).toLocaleDateString()}</Date>
//               <Category>{transaction.category || "Uncategorized"}</Category>
//               <Amount isExpense={transaction.amount < 0}>
//                 {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount)}
//               </Amount>
//             </TransactionItem>
//           ))
//         )}
//       </TransactionList>

//       {transactions.length > 5 && <ViewAll href="/transactions">View All</ViewAll>}
//     </Container>
//   );
// };

// export default Transactions;

// // ✅ Styled Components
// const Container = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
//   margin-top: 20px;
// `;

// const Title = styled.h2`
//   font-size: 1.5rem;
//   margin-bottom: 10px;
// `;

// const TransactionList = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

// const TransactionItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   padding: 10px;
//   border-bottom: 1px solid #e2e8f0;
// `;

// const Date = styled.span`
//   font-size: 1rem;
//   color: #718096;
// `;

// const Category = styled.span`
//   font-size: 1rem;
//   font-weight: bold;
// `;

// const Amount = styled.span`
//   font-size: 1rem;
//   font-weight: bold;
//   color: ${(props) => (props.isExpense ? "#e53e3e" : "#38a169")};
// `;

// const ViewAll = styled.a`
//   display: block;
//   margin-top: 10px;
//   text-align: right;
//   color: #5a67d8;
//   font-weight: bold;
//   cursor: pointer;
// `;



// // //this component is to show the category breakdown of the spending insights
// // //it will be displayed in the dashboard and Expenditure Summary page
// // //it will show a pie chart with the category breakdown
// // //it will show the percentage of spending in each category

// // import React, { useState, useEffect } from "react";
// // import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts"; //https://recharts.org/en-US/api/PieChart
// // import { db, auth } from "@/library/firebaseConfig";
// // import { doc, getDoc } from "firebase/firestore";

// // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

// // const CategoryBreakdown = () => {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     // Retrieve category breakdown data from Firestore
// //     const fetchCategoryData = async () => {
// //     //   //return none if no user is logged in  
// //     //   if (!auth.currentUser) return;
// //       //Query the user doc in Firestore
// //     //   const userRef = doc(db, "users", auth.currentUser.uid);
// //     //   const userSnap = await getDoc(userRef);

// //     //   if (userSnap.exists() && userSnap.data().categoryBreakdown) {
// //     //     setData(userSnap.data().categoryBreakdown);
// //     //   } else {
// //         // Placeholder Data if no API data is available
// //         setData([
// //           { name: "Rent", value: 1000 },
// //           { name: "Groceries", value: 500 },
// //           { name: "Entertainment", value: 200 },
// //           { name: "Utilities", value: 150 },
// //           { name: "Others", value: 250 },
// //         ]);
// //       }


// //     fetchCategoryData();
// //   }, []);

// //   return (
// //     <div style={{ width: "100%", height: 400, textAlign: "center" }}>
// //       <h2>Category Breakdown</h2>
// //       <ResponsiveContainer width="100%" height="100%">
// //         <PieChart>
// //           <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8">
// //             {data.map((entry, index) => (
// //               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //             ))}
// //           </Pie>
// //           <Tooltip />
// //           <Legend />
// //         </PieChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // };

// // export default CategoryBreakdown;
