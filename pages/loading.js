import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/StateContext";
import { checkUserBankStatus } from "@/backend/Auth";
import styled from "styled-components";

const LoadingPage = () => {
    const { user,userId, dashboardData, setDashboardData } = useStateContext();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!userId) {
            console.error("No user ID found. Redirecting to login...");
            router.push("/auth/login");
            return;
        }
        

        const fetchData = async () => {
            try {
              console.log("🔹 Checking bank connection...");
                const bankStatus = await checkUserBankStatus(user);

                if (!bankStatus.success) {
                    console.warn("⚠ No bank linked. Loading only manual transactions.");
                    setDashboardData({ accounts: [], transactions: {}, balances: {} }); // Empty bank data
                    setLoading(false);
                    return router.push(`/dashboard/${userId}`);
                }
                else{
                console.log("Bank linked! Fetching linked accounts...");
                const accountsRes = await fetch(`/api/accounts?firebaseUserId=${userId}`);
                if (!accountsRes.ok) throw new Error("Failed to fetch accounts.");
                const accountsData = await accountsRes.json();
                console.log("✅ Accounts fetched:", accountsData);

                let accountDetails = {};
                let transactions = {};
                let balances = {};

                for (const account of accountsData) {
                    const accountId = account.id;
                    console.log(`🔹 Fetching data for account: ${accountId}`);

                    // Fetch balances
                    const balanceRes = await fetch(`/api/balances?accountId=${accountId}&firebaseUserId=${userId}`);
                    if (!balanceRes.ok) throw new Error(`Failed to fetch balances for ${accountId}.`);
                    balances[accountId] = await balanceRes.json();

                    // Fetch transactions
                    const transactionsRes = await fetch(`/api/transactions?accountId=${accountId}&firebaseUserId=${userId}`);
                    if (!transactionsRes.ok) throw new Error(`Failed to fetch transactions for ${accountId}.`);
                    transactions[accountId] = await transactionsRes.json();

                    // Fetch account details
                    const detailsRes = await fetch(`/api/account-details?accountId=${accountId}&firebaseUserId=${userId}`);
                    if (!detailsRes.ok) throw new Error(`Failed to fetch account details for ${accountId}.`);
                    accountDetails[accountId] = await detailsRes.json();
                }

                // Store in global state
                setDashboardData({ accounts: accountsData, balances, transactions, accountDetails });
                console.log(dashboardData)
                console.log("✅ Data sync complete. Redirecting to dashboard...");

                setTimeout(() => {
                    router.push(`/dashboard/${userId}`);
                }, 2000);
                }
            } catch (error) {
                console.error("❌ Error during data sync:", error.message);
                alert(`Error: ${error.message}`);
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return (

          <LoadingContainer>
            <h2>Syncing your financial data... Please wait.</h2>
            {loading ? <Loader /> : <ErrorMessage>❌ Error: Unable to fetch data.</ErrorMessage>}
          </LoadingContainer>
    );
};

export default LoadingPage;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin-top: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
  margin-top: 20px;
`;
