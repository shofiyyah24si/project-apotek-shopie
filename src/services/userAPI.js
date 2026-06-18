import axios from "axios";

const BASE    = "https://ldexaprfnqjswfawiooq.supabase.co/rest/v1";
const API_KEY = "sb_publishable_8hDu4GKBE871zgPnFlwBjg_dPcwzfRA";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// ── Users ────────────────────────────────────────────────────
const USERS_URL = `${BASE}/users`;

export const userAPI = {

  async fetchUsers() {
    const res = await axios.get(USERS_URL, { headers });
    return res.data;
  },

  async loginUser(email, password) {
    const res = await axios.get(
      `${USERS_URL}?email=eq.${encodeURIComponent(email)}&password=eq.${encodeURIComponent(password)}`,
      { headers }
    );
    return res.data;
  },

  async registerUser(data) {
    const res = await axios.post(
      USERS_URL,
      { nama: data.nama, email: data.email, password: data.password, role: "user", level: "Bronze" },
      { headers: { ...headers, Prefer: "return=representation" } }
    );
    return res.data;
  },

  async createUser(data) {
    const res = await axios.post(USERS_URL, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return res.data;
  },

  async updateUser(id, data) {
    const res = await axios.patch(
      `${USERS_URL}?id=eq.${id}`,
      data,
      { headers: { ...headers, Prefer: "return=representation" } }
    );
    return res.data;
  },

  async deleteUser(id) {
    await axios.delete(`${USERS_URL}?id=eq.${id}`, { headers });
  },

  async checkEmailExists(email) {
    const res = await axios.get(
      `${USERS_URL}?email=eq.${encodeURIComponent(email)}`,
      { headers }
    );
    return res.data.length > 0;
  },

  // UPDATE LEVEL otomatis berdasarkan jumlah transaksi
  async updateLevel(userId, totalTransaksi) {
    let level = "Bronze";
    if (totalTransaksi >= 20) level = "Platinum";
    else if (totalTransaksi >= 10) level = "Gold";
    else if (totalTransaksi >= 5)  level = "Silver";

    await axios.patch(
      `${USERS_URL}?id=eq.${userId}`,
      { level },
      { headers: { ...headers, Prefer: "return=representation" } }
    );
    return level;
  },
};

// ── Transactions ─────────────────────────────────────────────
const TRX_URL = `${BASE}/transactions`;

export const transactionAPI = {

  // Ambil semua transaksi (admin)
  async fetchAll() {
    const res = await axios.get(`${TRX_URL}?order=created_at.desc`, { headers });
    return res.data;
  },

  // Ambil transaksi milik user tertentu saja (member)
  async fetchByUser(userId) {
    const res = await axios.get(
      `${TRX_URL}?user_id=eq.${userId}&order=created_at.desc`,
      { headers }
    );
    return res.data;
  },

  // Tambah transaksi baru
  async createTransaction(data) {
    const res = await axios.post(TRX_URL, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return res.data;
  },
};

// ── Complaints ───────────────────────────────────────────────
const COMPLAINTS_URL = `${BASE}/complaints`;

export const complaintAPI = {

  // Ambil semua komplain (admin)
  async fetchAll() {
    const res = await axios.get(`${COMPLAINTS_URL}?order=created_at.desc`, { headers });
    return res.data;
  },

  // Kirim komplain baru (member)
  async submitComplaint(data) {
    const res = await axios.post(COMPLAINTS_URL, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return res.data;
  },

  // Update status komplain (admin)
  async updateStatus(id, status) {
    const res = await axios.patch(
      `${COMPLAINTS_URL}?id=eq.${id}`,
      { status },
      { headers: { ...headers, Prefer: "return=representation" } }
    );
    return res.data;
  },
};
