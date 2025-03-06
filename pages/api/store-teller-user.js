import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { accessToken, firebaseUserId, tellerUserId } = req.body;

  if (!firebaseUserId) return res.status(400).json({ error: "Missing firebaseUserId" });

  try {
    await db.collection("users").doc(firebaseUserId).set(
      {
        tellerUserId,
        accessToken,
      },
      { merge: true }
    );

    res.status(200).json({ success: true, message: "Teller user stored successfully" });
  } catch (error) {
    console.error("❌ Error storing Teller user:", error.message);
    res.status(500).json({ error: error.message });
  }
}
