// import axios from "axios";
// import fs from "fs";

// const BASE_URL = "https://api.teller.io";

// const certConfig =
//   process.env.TELLER_CERTIFICATE_BASE64 && process.env.TELLER_PRIVATE_KEY_BASE64
//     ? {
//         cert: Buffer.from(process.env.TELLER_CERTIFICATE_BASE64, "base64").toString("utf-8"),
//         key: Buffer.from(process.env.TELLER_PRIVATE_KEY_BASE64, "base64").toString("utf-8"),
//       }
//     : null;


// export const fetchTellerAPI = async (endpoint, accessToken) => {
//   try {
//     console.log(certConfig)
//     const response = await axios.get(`${BASE_URL}${endpoint}`, {
//       auth: { username: accessToken, password: "" },
//       ...(certConfig ? { httpsAgent: certConfig } : {}),
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching ${endpoint}:`, error.response?.data || error.message);
//     throw new Error(error.response?.data?.error?.message || "Failed API request");
//   }
// };

import TellerClient from "@/lib/tellerClient";
import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { firebaseUserId, endpoint } = req.query;
  if (!firebaseUserId || !endpoint) return res.status(400).json({ error: "Missing parameters" });

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
    const response = await tellerClient._get(`/${endpoint}`);

    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error calling Teller API:", error.message);
    res.status(500).json({ error: error.message });
  }
}

