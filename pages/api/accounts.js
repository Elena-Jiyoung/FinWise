import { fetchTellerAPI } from "./teller";
import { db } from "@/lib/firebaseAdmin"; // Import shared Firebase instance
import TellerClient from "@/lib/tellerClient";



export default async function handler(req, res) {
    
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const { firebaseUserId } = req.query;

  if (!firebaseUserId) return res.status(400).json({ error: "Missing firebaseUserId" });

  try {
    const userDoc = await db.collection("users").doc(firebaseUserId).get();
    if (!userDoc.exists) return res.status(404).json({ error: "User not found" });

    const userData = userDoc.data();
    const accessToken = userData.accessToken;
    if (!accessToken) return res.status(400).json({ error: "No access token found" });
    const cert = Buffer.from(process.env.TELLER_CERTIFICATE_BASE64, "base64").toString("utf-8").replace(/\\n/g, '\n');
    const key = Buffer.from(process.env.TELLER_PRIVATE_KEY_BASE64, "base64").toString("utf-8").replace(/\\n/g, '\n');

    const certConfig = {
    cert,
    key,
    };

    

    const tellerClient = new TellerClient(certConfig, accessToken);
    const accounts = await tellerClient.listAccounts();

    res.status(200).json(accounts);
  } catch (error) {
    console.error("❌ Error fetching accounts:", error.message);
    res.status(500).json({ error: error.message });
  }
    if (!accessToken) {
      return res.status(400).json({ error: "No access token found." });
    }

    try {
      const accounts = await fetchTellerAPI("/accounts", accessToken);
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch accounts." });
    }
  } 