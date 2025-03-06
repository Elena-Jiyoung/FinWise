import admin from "firebase-admin";

// ✅ Prevent duplicate initialization in serverless functions
if (!admin.apps.length) {
  const firebaseConfigBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (!firebaseConfigBase64) {
    console.error("❌ Firebase service account is missing in environment variables.");
    throw new Error("Firebase service account missing.");
  }

  // ✅ Decode Base64 JSON
  const serviceAccount = JSON.parse(Buffer.from(firebaseConfigBase64, "base64").toString("utf-8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export default admin;
