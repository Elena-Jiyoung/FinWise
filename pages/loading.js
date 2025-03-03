import { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";

const Loading = () => {
  const { userId } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;

    const syncData = async () => {
      try {
        console.log("Fetching accounts...");
        const accountsRes = await fetch(`http://localhost:5000/fetch-accounts/${userId}`);
        if (!accountsRes.ok) throw new Error("Failed to fetch accounts");

        console.log("Fetching transactions...");
        const transactionsRes = await fetch(`http://localhost:5000/fetch-transactions/${userId}`);
        if (!transactionsRes.ok) throw new Error("Failed to fetch transactions");

        console.log("Processing spending data...");
        const spendingRes = await fetch(`http://localhost:5000/calculate-spending/${userId}`, { method: "POST" });
        if (!spendingRes.ok) throw new Error("Failed to calculate spending");

        console.log("✅ Data sync complete! Redirecting to dashboard...");
        router.push(`/dashboard/${userId}`);
      } catch (error) {
        console.error("❌ Error during data sync:", error.message);
        alert(`Error: ${error.message}`); // Notify user of failure
      }
    };

    syncData();
  }, [userId]);

  return <h2>🔄 Syncing your financial data... Please wait.</h2>;
};

export default Loading;
