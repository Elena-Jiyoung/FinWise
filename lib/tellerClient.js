import axios from "axios";
import https from "https";

class TellerClient {
  constructor(cert, accessToken = null) {
    this.cert = cert;
    this.accessToken = accessToken;
  }

  forUser(accessToken) {
    return new TellerClient(this.cert, accessToken);
  }

  async listAccounts() {
    return this._get("/accounts");
  }

  async getAccountDetails(accountId) {
    return this._get(`/accounts/${accountId}/details`);
  }

  async getAccountBalances(accountId) {
    return this._get(`/accounts/${accountId}/balances`);
  }

  async listAccountTransactions(accountId) {
    return this._get(`/accounts/${accountId}/transactions`);
  }

  async _get(path) {
    return this._request("GET", path);
  }

  async _request(method, path) {
    const url = `https://api.teller.io${path}`;
    console.log(`🔹 Requesting ${method} ${url}`);

    const headers = {
      "Content-Type": "application/json",
    };

    // ✅ Use TLS Certificate only if available
    let httpsAgent;
    if (this.cert && this.cert.cert && this.cert.key) {
      httpsAgent = new https.Agent({
        cert: this.cert.cert,
        key: this.cert.key,
      });
    }

    try {
      const response = await axios({
        method,
        url,
        headers,
        ...(httpsAgent ? { httpsAgent } : {}), // ✅ Only include if cert is available
        auth: this.accessToken ? { username: this.accessToken, password: "" } : undefined, // ✅ Ensure Basic Auth
      });

      return response.data;
    } catch (error) {
      console.error(`❌ Error in ${method} ${url}:`, error.response?.data || error.message);
      throw new Error(error.response?.data?.error?.message || "Failed API request");
    }
  }
}

export default TellerClient;
