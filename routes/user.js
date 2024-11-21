const express = require('express');
const router = express.Router();

let users = [
    {
        id: 1,
        nama: "Isro Usman",
        noTelepon: "081240978767",
    },
];

// Menampilkan semua user
router.get('/', (req, res) => {
    res.json(users);
});

// Menambahkan user baru
router.post('/', (req, res) => {
    const { nama, noTelepon } = req.body;
    const newuser = {
        id: users.length + 1,
        nama: nama,
        noTelepon: noTelepon,
    };
    users.push(newuser);
    res.status(201).json(newuser);
});

// Menghapus user berdasarkan ID
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User tidak ditemukan' });

    const deletedUser = users.splice(userIndex, 1)[0]; // Menghapus dan menyimpan user yang dihapus
    res.status(200).json({ message: `User: '${deletedUser.nama}' telah dihapus` });
});

// Memperbarui user berdasarkan ID
router.put('/:id', (req, res) => {
    const { nama, noTelepon } = req.body;
    const user = users.find(user => user.id === parseInt(req.params.id));

    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    user.nama = nama || user.nama;
    user.noTelepon = noTelepon || user.noTelepon;

    res.status(200).json({
        message: `User dengan ID ${user.id} telah diperbarui`,
        updatedUser: user
    });
});

module.exports = router;
