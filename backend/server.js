// Code for the backend server
const db = admin.firestore();
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");

// server.js (Backend)
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK (Secure Backend Only)
const serviceAccount = require("./firebase-adminsdk.json"); // Download this from Firebase Console

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}


const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

let accessToken = null; // Store user access token (temporary, use DB for production)

// Store Access Token (called from frontend) in firebase
app.post("/store-token", async (req, res) => {
  accessToken = req.body.access_token;
  userId = req.body.userId;
  try {
    await db.collection("users").doc(userId).set({
      accessToken: accessToken,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("✅ Access token stored in Firestore!");
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error saving to Firestore:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch Bank Accounts (requires Teller API access)
app.get("/fetch-accounts", async (req, res) => {
  if (!accessToken) {
    return res.status(400).json({ error: "No access token found" });
  }

  try {
    const response = await axios.get("https://api.teller.io/accounts", {
      headers: {
        Authorization: `Basic ${accessToken}:`,
      },
      cert: fs.readFileSync("C:/Dev/FinWise/teller/certificate.pem"),
      key: fs.readFileSync("C:/Dev/FinWise/teller/private_key.pem"),
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching accounts:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});


// Fetch Transactions
app.get("/fetch-transactions/:accountId", async (req, res) => {
  if (!accessToken) return res.status(400).json({ error: "No access token found" });

  try {
    const { accountId } = req.params;
    const response = await axios.get(`https://api.teller.io/accounts/${accountId}/transactions`, {
      headers: { Authorization: `Basic ${accessToken}:` },
      cert: fs.readFileSync("C:/Dev/FinWise/teller/certificate.pem"),
      key: fs.readFileSync("C:/Dev/FinWise/teller/private_key.pem"),
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch Balances
app.get("/fetch-balances/:accountId", async (req, res) => {
  if (!accessToken) return res.status(400).json({ error: "No access token found" });

  try {
    const { accountId } = req.params;
    const response = await axios.get(`https://api.teller.io/accounts/${accountId}/balances`, {
      headers: { Authorization: `Basic ${accessToken}:` },
      cert: fs.readFileSync("C:/Dev/FinWise/teller/certificate.pem"),
      key: fs.readFileSync("C:/Dev/FinWise/teller/private_key.pem"),
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching balances:", error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch Identity
app.get("/fetch-identity", async (req, res) => {
  if (!accessToken) return res.status(400).json({ error: "No access token found" });

  try {
    const response = await axios.get("https://api.teller.io/identity", {
      headers: { Authorization: `Basic ${accessToken}:` },
      cert: fs.readFileSync("C:/Dev/FinWise/teller/certificate.pem"),
      key: fs.readFileSync("C:/Dev/FinWise/teller/private_key.pem"),
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching identity:", error);
    res.status(500).json({ error: error.message });
  }
});
// Start Server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
