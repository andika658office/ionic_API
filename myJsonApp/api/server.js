const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke database MySQL (XAMPP)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // default XAMPP
  password: "",      // default kosong
  database: "mobile"
});

db.connect(err => {
  if (err) {
    console.error("Koneksi gagal:", err);
  } else {
    console.log("Terkoneksi ke MySQL");
  }
});

// Endpoint ambil semua user
app.get("/users", (req, res) => {
  db.query("SELECT id, name, email FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Endpoint login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) {
      return res.json({ success: false, message: "User tidak ditemukan" });
    }
    const user = results[0];
    if (user.password === password) {
      res.json({ success: true, message: "Login berhasil", user });
    } else {
      res.json({ success: false, message: "Password salah" });
    }
  });
});

// Endpoint tambah user
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, message: "User berhasil ditambahkan", id: result.insertId });
  });
});

// Endpoint edit user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
  db.query(sql, [name, email, password, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, message: "User berhasil diupdate" });
  });
});

// Endpoint hapus user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, message: "User berhasil dihapus" });
  });
});


// Jalankan server
app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});