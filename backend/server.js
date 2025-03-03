// Code for the backend server
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const admin = require("firebase-admin");
var serviceAccount = require("C:/Dev/FinWise/finwise-7a208-firebase-adminsdk-fbsvc-7be90a76ca.json")
// Prevent duplicate Firebase Admin initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Correct Firestore Initialization
const db = admin.firestore();


let accessToken = null; // Store user access token (temporary, use DB for production)

// Step 1. Store Access Token (called from frontend) in firebase
app.post("/store-token", async (req, res) => {
  accessToken = req.body.access_token;
  userId = req.body.userId;
  if (!userId || !accessToken) return res.status(400).json({ error: "Missing fields" });
  try {
    await db.collection("users").doc(userId).set({ accessToken: accessToken}, { merge: true });

    console.log("✅ Access token stored in Firestore!");
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error saving to Firestore:", error);
    res.status(500).json({ error: error.message });
  }
});

// Step 2. Fetch Bank Accounts (requires Teller API access)
app.get("/fetch-accounts/:userId", async (req, res) => {
  const {userId} = req.params;
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists || !userDoc.data().accessToken) {
      return res.status(400).json({ error: "No access token found." });
    }

    const accessToken = userDoc.data().accessToken;
    const response = await axios.get("https://api.teller.io/accounts", {
      headers: { Authorization: `Basic ${accessToken}:` },
      cert: fs.readFileSync("C:/Dev/FinWise/teller/certificate.pem"), // Path to your Teller certificate
      key: fs.readFileSync("C:/Dev/FinWise/teller/private_key.pem"), // Path to your Teller private key
    });

    // ✅ Store accounts in Firestore
    const batch = db.batch();
    response.data.forEach((account) => {
      const accRef = db.collection("users").doc(userId).collection("accounts").doc(account.id);
      batch.set(accRef, account);
    });

    await batch.commit();
    console.log(`✅ Accounts stored for ${userId}`);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching accounts:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
});

// ✅ Fetch and Store Transactions
app.get("/fetch-transactions/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists || !userDoc.data().accessToken) {
      return res.status(400).json({ error: "No access token found." });
    }

    const accessToken = userDoc.data().accessToken;
    const accountsSnapshot = await db.collection("users").doc(userId).collection("accounts").get();

    let allTransactions = [];
    for (const accountDoc of accountsSnapshot.docs) {
      const accountId = accountDoc.id;
      const response = await axios.get(`https://api.teller.io/accounts/${accountId}/transactions`, {
        headers: { Authorization: `Basic ${accessToken}:` },
      });

      response.data.forEach((txn) => {
        const txnRef = db.collection("users").doc(userId).collection("transactions").doc(txn.id);
        db.collection("users").doc(userId).collection("transactions").doc(txn.id).set(txn);
        allTransactions.push(txn);
      });
    }

    console.log(`✅ Transactions stored for ${userId}`);
    res.json(allTransactions);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error.message);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// ✅ Process Spending Trends
app.post("/calculate-spending/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const transactionsSnapshot = await db.collection("users").doc(userId).collection("transactions").get();
    let monthlyTotals = {};
    let categoryTotals = {};

    transactionsSnapshot.forEach((txnDoc) => {
      const txn = txnDoc.data();
      if (txn.amount > 0) return; // Ignore income

      const month = txn.date.substring(0, 7);
      monthlyTotals[month] = (monthlyTotals[month] || 0) + Math.abs(txn.amount);
      categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + Math.abs(txn.amount);
    });

    await db.collection("users").doc(userId).set({ spendingSummary: { monthlySpending: monthlyTotals, categoryBreakdown: categoryTotals } }, { merge: true });

    console.log(`✅ Spending summary stored for ${userId}`);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error calculating spending:", error.message);
    res.status(500).json({ error: "Failed to process spending" });
  }
});

// Step 5: Fetch Preprocessed Data for Frontend
app.get("/get-spending-summary/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) return res.status(400).json({ error: "User not found" });

    const spendingSummary = userDoc.data().spendingSummary || {};
    res.json(spendingSummary);
  } catch (error) {
    console.error("❌ Error fetching summary:", error);
    res.status(500).json({ error: error.message });
  }
});

// // Fetch Balances
// app.get("/fetch-balances/:accountId", async (req, res) => {
//   if (!accessToken) return res.status(400).json({ error: "No access token found" });

//   try {
//     const { accountId } = req.params;
//     const response = await axios.get(`https://api.teller.io/accounts/${accountId}/balances`, {
//       headers: { Authorization: `Basic ${accessToken}:` },
//       cert: fs.readFileSync("C:/Dev/FinWise/teller/certificate.pem"),
//       key: fs.readFileSync("C:/Dev/FinWise/teller/private_key.pem"),
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching balances:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Fetch Identity
// app.get("/fetch-identity", async (req, res) => {
//   if (!accessToken) return res.status(400).json({ error: "No access token found" });

//   try {
//     const response = await axios.get("https://api.teller.io/identity", {
//       headers: { Authorization: `Basic ${accessToken}:` },
//       cert: fs.readFileSync("C:/Dev/FinWise/teller/certificate.pem"),
//       key: fs.readFileSync("C:/Dev/FinWise/teller/private_key.pem"),
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching identity:", error);
//     res.status(500).json({ error: error.message });
//   }
// });
// Start Server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
