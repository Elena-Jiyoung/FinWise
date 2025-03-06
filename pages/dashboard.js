//The Dashboard is the central hub where users can see an overview of
//their financial status, savings goals, and spending trends.
//Features: 1. Shows financial summary (balance, income, expenses)
// 2. Navigation to Goal Tracker and Expenditure Summary
// 3. Quick actions: Connect Bank, Add Transactions, Export Data
import { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";

const DashboardRedirect = () => {
  const { userId } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push("/auth/login"); // Redirect to login if not authenticated
    } else {
      router.push(`/loading`); // Ensure financial data is synced first
    }
  }, [userId]);

  return <h2>🔄 Redirecting...</h2>;
};

export default DashboardRedirect;
