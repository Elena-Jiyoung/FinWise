import { fetchTellerAPI } from "./teller";
import admin from "firebase-admin";

async function getAccessToken(userId) {
  const userDoc = await admin.firestore().collection("users").doc(userId).get();
  return userDoc.exists ? userDoc.data().accessToken : null;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { accountId, firebaseUserId } = req.query;
    const accessToken = await getAccessToken(firebaseUserId);

    if (!accessToken || !accountId) {
      return res.status(400).json({ error: "Missing access token or account ID." });
    }

    try {
      const details = await fetchTellerAPI(`/accounts/${accountId}/details`, accessToken);
      res.json(details);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch account details." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
