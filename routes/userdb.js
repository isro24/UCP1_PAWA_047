const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Mengimpor koneksi database

// Endpoint untuk mendapatkan semua pengguna
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.json(results);
    });
});

// Endpoint untuk mendapatkan pengguna berdasarkan ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.length === 0) return res.status(404).send('Pengguna tidak ditemukan');
        res.json(results[0]);
    });
});

// Endpoint untuk menambahkan pengguna baru
router.post('/', (req, res) => {
    const { nama, noTelepon } = req.body;

    if (!nama || !noTelepon) {
        return res.status(400).send('Nama dan nomor telepon harus diisi');
    }

    db.query('INSERT INTO users (nama, noTelepon) VALUES (?, ?)', [nama.trim(), noTelepon.trim()], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        const newUser = { id: results.insertId, nama: nama.trim(), noTelepon: noTelepon.trim() };
        res.status(201).json(newUser);
    });
});

// Endpoint untuk memperbarui data pengguna
router.put('/:id', (req, res) => {
    const { nama, noTelepon } = req.body;

    if (!nama || !noTelepon) {
        return res.status(400).send('Nama dan nomor telepon harus diisi');
    }

    db.query('UPDATE users SET nama = ?, noTelepon = ? WHERE id = ?', [nama.trim(), noTelepon.trim(), req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Pengguna tidak ditemukan');
        res.json({ id: req.params.id, nama, noTelepon });
    });
});

// Endpoint untuk menghapus pengguna
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send('Internal Server Error');
        if (results.affectedRows === 0) return res.status(404).send('Pengguna tidak ditemukan');
        res.status(204).send();
    });
});

module.exports = router;
