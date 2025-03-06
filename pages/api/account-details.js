import TellerClient from "@/lib/tellerClient";
import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { accountId, firebaseUserId } = req.query;
  if (!accountId || !firebaseUserId) return res.status(400).json({ error: "Missing parameters" });

  try {
    const userDoc = await db.collection("users").doc(firebaseUserId).get();
    if (!userDoc.exists) return res.status(404).json({ error: "User not found" });

    const userData = userDoc.data();
    const accessToken = userData.accessToken;
    if (!accessToken) return res.status(400).json({ error: "No access token found" });

    const cert = {
      cert: Buffer.from(process.env.TELLER_CERTIFICATE_BASE64, "base64").toString("utf-8"),
      key: Buffer.from(process.env.TELLER_PRIVATE_KEY_BASE64, "base64").toString("utf-8"),
    };

    const tellerClient = new TellerClient(cert, accessToken);
    const accountDetails = await tellerClient.getAccountDetails(accountId);

    res.status(200).json(accountDetails);
  } catch (error) {
    console.error("❌ Error fetching account details:", error.message);
    res.status(500).json({ error: error.message });
  }
}
