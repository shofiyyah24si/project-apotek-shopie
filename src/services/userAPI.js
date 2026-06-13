import axios from "axios";

const API_URL = "https://ldexaprfnqjswfawiooq.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_8hDu4GKBE871zgPnFlwBjg_dPcwzfRA";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const userAPI = {

  // READ — ambil semua user (untuk halaman admin)
  async fetchUsers() {
    const res = await axios.get(API_URL, { headers });
    return res.data;
  },

  // LOGIN — cari user berdasarkan email & password
  async loginUser(email, password) {
    const res = await axios.get(
      `${API_URL}?email=eq.${encodeURIComponent(email)}&password=eq.${encodeURIComponent(password)}`,
      { headers }
    );
    return res.data; // array, index [0] jika ada
  },

  // REGISTER — daftar user baru dengan role "user"
  async registerUser(data) {
    const res = await axios.post(
      API_URL,
      { nama: data.nama, email: data.email, password: data.password, role: "user" },
      { headers: { ...headers, Prefer: "return=representation" } }
    );
    return res.data;
  },

  // CREATE — admin tambah user baru
  async createUser(data) {
    const res = await axios.post(API_URL, data, {
      headers: { ...headers, Prefer: "return=representation" },
    });
    return res.data;
  },

  // UPDATE — edit user berdasarkan id
  async updateUser(id, data) {
    const res = await axios.patch(
      `${API_URL}?id=eq.${id}`,
      data,
      { headers: { ...headers, Prefer: "return=representation" } }
    );
    return res.data;
  },

  // DELETE — hapus user berdasarkan id
  async deleteUser(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },

  // CEK EMAIL — untuk validasi duplikat saat register
  async checkEmailExists(email) {
    const res = await axios.get(
      `${API_URL}?email=eq.${encodeURIComponent(email)}`,
      { headers }
    );
    return res.data.length > 0;
  },
};
