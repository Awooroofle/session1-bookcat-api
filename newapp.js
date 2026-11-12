const express = require('express');
const sql = require('mssql'); // Loads the mssql package[cite: 62]
const app = express();

// 1. The Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome to the Book Category API');
}); //

// 2. The Categories Route
app.get('/categories', (req, res) => {
    res.json([
        { id: 1, name: 'Fiction' },
        { id: 2, name: 'Non-Fiction' },
        { id: 3, name: 'Biography' }
    ]);
}); //[cite: 56]

// 3. Your Custom About Route
app.get('/about', (req, res) => {
    // You can customize this paragraph introducing yourself[cite: 57]
    res.send('Hi, my name is Dominic and this is my first API!');
}); 

// 4. The Database Test Route
app.get('/db-test', async (req, res) => {
    try {
        const pool = await sql.connect({
            server: 'localhost',
            port: 1433,
            database: 'NPBookstore',
            user: 'npbookstore_user', // Your SQL login name
            password: 'user', // Change this to the password you set[cite: 64]
            options: { trustServerCertificate: true }
        });
        const result = await pool.request()
            .query('SELECT COUNT(*) AS Total FROM Author');
        await pool.close();
        res.json({ connected: true, authors: result.recordset[0].Total });
    } catch (err) {
        res.status(500).json({ connected: false, error: err.message });
    }
}); //[cite: 63]

// Start the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
}); //[cite: 55]