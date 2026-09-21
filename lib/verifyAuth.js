import admin from "./firebaseAdmin";

// Verifies the Firebase ID token sent by the client in the
// `Authorization: Bearer <idToken>` header and returns the caller's uid.
// Throws an Error with a `status` property on failure so API routes can
// respond with the right HTTP status code.
export async function requireAuth(req) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    const error = new Error("Missing or invalid Authorization header");
    error.status = 401;
    throw error;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (err) {
    const error = new Error("Invalid or expired token");
    error.status = 401;
    throw error;
  }
}
