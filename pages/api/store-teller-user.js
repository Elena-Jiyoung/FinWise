import { db } from "@/lib/firebaseAdmin";
import { requireAuth } from "@/lib/verifyAuth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { accessToken, tellerUserId } = req.body;

  try {
    const firebaseUserId = await requireAuth(req);

    await db.collection("users").doc(firebaseUserId).set(
      {
        tellerUserId,
        accessToken,
      },
      { merge: true }
    );

    return res.status(200).json({ success: true, message: "Teller user stored successfully" });
  } catch (error) {
    console.error("❌ Error storing Teller user:", error.message);
    return res.status(error.status || 500).json({ error: error.message });
  }
}
