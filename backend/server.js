//I used this file as my server initially, and migrated to pages/api/ API routes for Next.js.
// Hence, this file is no longer in use.

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const fs = require("fs");
// const admin = require("firebase-admin");
// const yargs = require("yargs");
// const { doc, setDoc, getDoc, collection, getDocs } = require("firebase-admin/firestore");

// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 5000;

// // ✅ Parse Command-Line Arguments (Like Python Example)
// const args = yargs
//   .option("environment", {
//     alias: "env",
//     describe: "API environment to target",
//     choices: ["sandbox", "development", "production"],
//     default: "sandbox",
//   })
//   .option("cert", {
//     describe: "Path to the TLS certificate",
//     type: "string",
//   })
//   .option("cert-key", {
//     describe: "Path to the TLS certificate private key",
//     type: "string",
//   })
//   .help()
//   .argv;

// // Determine Base URL
// const BASE_URL = "https://api.teller.io";

// // Handle Certificate Requirement for Production
// const needsCert = args.environment !== "sandbox";
// if (needsCert && (!args.cert || !args["cert-key"])) {
//   console.error("❌ Error: --cert and --cert-key are required when --environment is not sandbox");
//   process.exit(1);
// }

// const certConfig = needsCert && process.env.TELLER_CERTIFICATE_BASE64 && process.env.TELLER_PRIVATE_KEY_BASE64
//   ? {
//       cert: Buffer.from(process.env.TELLER_CERTIFICATE_BASE64, "base64").toString("utf-8"),
//       key: Buffer.from(process.env.TELLER_PRIVATE_KEY_BASE64, "base64").toString("utf-8"),
//     }
//   : null;

//   if (needsCert && !certConfig) {
//     console.error("❌ Error: TLS certificate or private key missing from environment variables.");
//     process.exit(1);
//   }
// // ✅ Load Firebase Service Account from Environment Variable
// const firebaseConfigBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
// if (!firebaseConfigBase64) {
//   console.error("❌ Firebase service account is missing in environment variables.");
//   process.exit(1);
// }

// // ✅ Decode Base64 JSON
// const serviceAccount = JSON.parse(Buffer.from(firebaseConfigBase64, "base64").toString("utf-8"));

// // // ✅ Initialize Firebase
// // var serviceAccount = require("C:/Dev/FinWise/finwise-7a208-firebase-adminsdk-fbsvc-7be90a76ca.json");
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }
// const db = admin.firestore();

// // ✅ Define TellerClient Class (Like Python Version)
// class TellerClient {
//   constructor(cert, accessToken = null) {
//     this.cert = cert;
//     this.accessToken = accessToken;
//   }

//   forUser(accessToken) {
//     return new TellerClient(this.cert, accessToken);
//   }

//   async listAccounts() {
//     return this._get("/accounts");
//   }

//   async getAccountDetails(accountId) {
//     return this._get(`/accounts/${accountId}/details`);
//   }

//   async getAccountBalances(accountId) {
//     return this._get(`/accounts/${accountId}/balances`);
//   }

//   async listAccountTransactions(accountId) {
//     return this._get(`/accounts/${accountId}/transactions`);
//   }

//   async listAccountPayees(accountId, scheme) {
//     return this._get(`/accounts/${accountId}/payments/${scheme}/payees`);
//   }

//   async createAccountPayee(accountId, scheme, data) {
//     return this._post(`/accounts/${accountId}/payments/${scheme}/payees`, data);
//   }

//   async createAccountPayment(accountId, scheme, data) {
//     return this._post(`/accounts/${accountId}/payments/${scheme}`, data);
//   }

//   async _get(path) {
//     return this._request("GET", path);
//   }

//   async _post(path, data) {
//     return this._request("POST", path, data);
//   }

//   async _request(method, path, data = null) {
//     const url = `${BASE_URL}${path}`;
//     console.log(`🔹 Requesting ${method} ${url}`);

//     const headers = {
//       Authorization: `Bearer ${this.accessToken}`,
//       "Content-Type": "application/json",
//     };

//     try {
//       const response = await axios({
//         method,
//         url,
//         data,
//         headers,
//         ...(this.cert ? { httpsAgent: this.cert } : {}),
//       });

//       return response.data;
//     } catch (error) {
//       console.error(`Error in ${method} ${url}:`, error.response?.data || error.message);
//       throw new Error(error.response?.data?.error?.message || "Failed API request");
//     }
//   }
// }
// app.post("/store-teller-user", async (req, res) => {
//   try {
//     const { accessToken, firebaseUserId, tellerUserId } = req.body;
    
//     if (!firebaseUserId) {
//       return res.status(400).json({ error: "Missing firebaseUserId" });
//     }

//     const db = admin.firestore();
//     const userRef = db.collection("users").doc(firebaseUserId);
//     const response = await userRef.set({ tellerUserId: tellerUserId, accessToken: accessToken });
//     console.log(response.data())
//     res.json({ success: true, message: "Teller user stored successfully" });
//   } catch (error) {
//     console.error("❌ Error storing Teller user ID:", error);
//     res.status(500).json({ error: error.message });
//   }
// });
// // async function storeTestUser() {
// //   const testUserId = "usr_pankm5dj2rh8v592u6000";  // Replace with actual Teller User ID
// //   const testAccessToken = "test_token_ubyx3pzbdp3eo";  // Replace with actual Teller Access Token
// //   const testAccountId = "acc_pankm5d532nmbh5h06000";  // Replace with actual Teller Account ID

// //   try {
// //     await db.collection("users").doc(testUserId).set({
// //       accessToken: testAccessToken,
// //       accountId: testAccountId
// //     }, { merge: true });

// //     console.log("✅ Test user stored successfully in Firestore.");
// //   } catch (error) {
// //     console.error("Error storing test user:", error);
// //   }
// // }

// // Run once at startup
// //storeTestUser();
// async function getAccessToken(userId) {
//   try {
//     const userDoc = await db.collection("users").doc(userId).get();

//     if (!userDoc.exists) {
//       console.error(`No access token found for user: ${userId}`);
//       return null;
//     }

//     const data = userDoc.data();
//     console.log(`Retrieved access token for ${userId}: ${data.accessToken}`);
//     return data.accessToken || null;
//   } catch (error) {
//     console.error("Error fetching access token:", error);
//     return null;
//   }
// }

// app.get("/api/identity/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const accessToken = await getAccessToken(userId);

//   if (!accessToken || !accountId) {
//     return res.status(400).json({ error: "Missing access token or account ID." });
//   }

//   try {
//     console.log(`🔹 Fetching identity information for account: ${accountId}`);

//     // ✅ Correct API call for identity data
//     const response = await axios.get(`https://api.teller.io/accounts/${accountId}/identity`, {
//       auth: { username: accessToken, password: "" } // ✅ Use Basic Auth
//     });

//     console.log("✅ Identity information fetched:", response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching identity:", error.response?.data || error.message);
//     res.status(error.response?.status || 500).json({ error: "Failed to fetch identity details." });
//   }
// });

// app.get("/api/accounts/:firebaseUserId", async (req, res) => {
//   const { firebaseUserId } = req.params;

//   try {
//     const userDoc = await db.collection("users").doc(firebaseUserId).get();

//     if (!userDoc.exists) { // ✅ FIXED: No parentheses
//       return res.status(400).json({ error: "User not found in Firestore." });
//     }

//     const userData = userDoc.data();
//     const tellerUserId = userData.tellerUserId;
//     const accessToken = userData.accessToken;

//     if (!tellerUserId || !accessToken) {
//       return res.status(400).json({ error: "No Teller user ID or access token found." });
//     }

//     console.log(`🔹 Fetching all accounts for Teller user: ${tellerUserId}`);

//     const response = await axios.get(`https://api.teller.io/accounts`, {
//       auth: { username: accessToken, password: "" }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("❌ Error fetching accounts:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to fetch accounts." });
//   }
// });

// app.get("/api/accounts/:accountId/:firebaseUserId/details", async (req, res) => {
//   let accountId = req.params.accountId
//   let firebaseUserId = req.params.firebaseUserId;
//   const accessToken = await getAccessToken(firebaseUserId);
//   if (!accessToken || !accountId) {
//     return res.status(400).json({ error: "Missing access token or account ID." });
//   }

//   try {
//     console.log(`🔹 Fetching FULL ACCOUNT DATA (including balances) for account: ${accountId}`);

//     // ✅ Correct API call
//     const response = await axios.get(`https://api.teller.io/accounts/${accountId}/details`, {
//       auth: { username: accessToken, password: "" }
//     });

//     console.log("✅ Account details fetched:", response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching balances:", error.response?.data || error.message);
//     res.status(error.response?.status || 500).json({ error: "Failed to fetch account details." });
//   }

// })

// app.get("/api/accounts/:accountId/:firebaseUserId/balances", async (req, res) => {
//   let accountId = req.params.accountId
//   let firebaseUserId = req.params.firebaseUserId;
//   console.log(accountId, firebaseUserId)
//   const accessToken = await getAccessToken(firebaseUserId);
  

//   if (!accessToken || !accountId) {
//     return res.status(400).json({ error: "Missing access token or account ID." });
//   }

//   try {
//     console.log(`🔹 Fetching balances for account: ${accountId}`);

//     // ✅ Correct API call
//     const response = await axios.get(`https://api.teller.io/accounts/${accountId}/balances`, {
//       auth: { username: accessToken, password: "" }
//     });

//     console.log("✅ Account balances fetched:", response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching balances:", error.response?.data || error.message);
//     res.status(error.response?.status || 500).json({ error: "Failed to fetch account details." });
//   }
// });

// app.get("/api/accounts/:accountId/:firebaseUserId/transactions", async (req, res) => {
//   let accountId = req.params.accountId
//   const firebaseUserId  = req.params.firebaseUserId;
//   const accessToken = await getAccessToken(firebaseUserId);
//   try {

//     // Fetch all accounts linked to the Teller user
//     const transactionRes = await axios.get(`https://api.teller.io/accounts/${accountId}/transactions`, {
//       auth: { username: accessToken, password: "" }
//     });


//     console.log("Fetched account transactions: ", transactionRes.data)
//     res.json(transactionRes.data)
//   } catch (error) {
//     console.error("❌ Error fetching transactions:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to fetch transactions." });
//   }
// });

// // ✅ Fetch Account Details
// app.get("/api/accounts/:accountId/:userId/details", async (req, res) => {
//   const { userId } = req.params;
//   const accessToken = await getAccessToken(userId);


//   if (!accessToken || !accountId) {
//     return res.status(400).json({ error: "Missing access token or account ID." });
//   }

//   try {
//     console.log(`🔹 Fetching account details for account: ${accountId}`);

//     // ✅ Correct API call (Fetch account details)
//     const response = await axios.get(`https://api.teller.io/accounts/${accountId}/details`, {
//       auth: { username: accessToken, password: "" } // ✅ Use Basic Auth instead of Bearer token
//     });

//     console.log("✅ Account details fetched:", response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("❌ Error fetching account details:", error.response?.data || error.message);
//     res.status(error.response?.status || 500).json({ error: "Failed to fetch account details." });
//   }
// });


// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Backend running on http://localhost:${PORT}`);
//   console.log(`🔹 Environment: ${args.environment}`);
//   console.log(`🔹 Using Base URL: ${BASE_URL}`);
//   if (certConfig) console.log("🔹 TLS Certificate is enabled");
// });
