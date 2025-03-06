import { fetchTellerAPI } from "./teller";
import admin from "firebase-admin";

async function getAccessToken(userId) {
  const userDoc = await admin.firestore().collection("users").doc(userId).get();
  return userDoc.exists ? userDoc.data().accessToken : null;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { firebaseUserId } = req.query;
    const accessToken = await getAccessToken(firebaseUserId);

    if (!accessToken) {
      return res.status(400).json({ error: "No access token found." });
    }

    try {
      const identity = await fetchTellerAPI("/identity", accessToken);
      res.json(identity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch identity details." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
