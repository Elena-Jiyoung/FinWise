//this component is to show the category breakdown of the spending insights
//it will be displayed in the dashboard and Expenditure Summary page
//it will show a pie chart with the category breakdown
//it will show the percentage of spending in each category

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from "recharts"; //https://recharts.org/en-US/api/PieChart
import { db, auth } from "@/library/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const CategoryBreakdown = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Retrieve category breakdown data from Firestore
    const fetchCategoryData = async () => {
    //   //return none if no user is logged in  
    //   if (!auth.currentUser) return;
      //Query the user doc in Firestore
    //   const userRef = doc(db, "users", auth.currentUser.uid);
    //   const userSnap = await getDoc(userRef);

    //   if (userSnap.exists() && userSnap.data().categoryBreakdown) {
    //     setData(userSnap.data().categoryBreakdown);
    //   } else {
        // Placeholder Data if no API data is available
        setData([
          { name: "Rent", value: 1000 },
          { name: "Groceries", value: 500 },
          { name: "Entertainment", value: 200 },
          { name: "Utilities", value: 150 },
          { name: "Others", value: 250 },
        ]);
      }


    fetchCategoryData();
  }, []);

  return (
    <div style={{ width: "100%", height: 400, textAlign: "center" }}>
      <h2>Category Breakdown</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryBreakdown;
