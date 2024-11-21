const express = require('express');
const app = express();
const usersRoutes = require('./routes/userdb.js');
require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());

app.use('/users', usersRoutes);
const db = require('./database/db');

// Mengatur view engine EJS
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layouts',
    });
});

app.get('/user-view', (req, res) => {
    db.query('SELECT * FROM users', (err, users) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.render('user', {
            layout: 'layouts/main-layouts',
            users: users
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
