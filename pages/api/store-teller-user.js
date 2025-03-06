import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString()
);

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { accessToken, firebaseUserId, tellerUserId } = req.body;

    if (!firebaseUserId) {
      return res.status(400).json({ error: "Missing firebaseUserId" });
    }

    try {
      await db.collection("users").doc(firebaseUserId).set({ tellerUserId, accessToken });
      res.json({ success: true, message: "Teller user stored successfully" });
    } catch (error) {
      console.error("Error storing Teller user:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
