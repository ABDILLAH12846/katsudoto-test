const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000 || process.env.PORT;

const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'kelompokdevops', // Ganti dengan username MySQL Anda
  password: 'Zakyirhamna=123', // Ganti dengan password MySQL Anda
  database: 'kelompokdevops', // Ganti dengan nama database Anda
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(cors())
app.use(bodyParser.json());

// Mendapatkan semua mahasiswa
app.get('/', (req, res) => {
  connection.query('SELECT * FROM mahasiswa', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Menambahkan data mahasiswa baru
app.post('/', (req, res) => {
  const { nim, nama } = req.body;
  const newMahasiswa = { nim, nama };
  connection.query('INSERT INTO mahasiswa SET ?', newMahasiswa, (error, results) => {
    if (error) throw error;
    res.json({ message: 'Data mahasiswa berhasil ditambahkan', id: results.insertId });
  });
});

// Memperbarui data mahasiswa berdasarkan ID
app.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nim, nama } = req.body;
  connection.query('UPDATE mahasiswa SET nim = ?, nama = ? WHERE id = ?', [nim, nama, id], (error, results) => {
    if (error) throw error;
    res.json({ message: 'Data mahasiswa berhasil diperbarui' });
  });
});

// Menghapus data mahasiswa berdasarkan ID
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM mahasiswa WHERE id = ?', id, (error, results) => {
    if (error) throw error;
    res.json({ message: 'Data mahasiswa berhasil dihapus' });
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});