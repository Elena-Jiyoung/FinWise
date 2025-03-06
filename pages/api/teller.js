import axios from "axios";
import fs from "fs";

const BASE_URL = "https://api.teller.io";

const certConfig =
  process.env.TELLER_CERTIFICATE_BASE64 && process.env.TELLER_PRIVATE_KEY_BASE64
    ? {
        cert: Buffer.from(process.env.TELLER_CERTIFICATE_BASE64, "base64").toString("utf-8"),
        key: Buffer.from(process.env.TELLER_PRIVATE_KEY_BASE64, "base64").toString("utf-8"),
      }
    : null;

export const fetchTellerAPI = async (endpoint, accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      auth: { username: accessToken, password: "" },
      ...(certConfig ? { httpsAgent: certConfig } : {}),
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || "Failed API request");
  }
};
