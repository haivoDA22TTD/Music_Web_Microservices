const express = require('express');
const db = require('./config/db.config');
const uploadRoutes = require('./routes/uploadRoutes.routes.js');
const path = require('path');

const app = express();
const port = 5000;

// Middleware để parse JSON
app.use(express.json());

// Route cơ bản
app.get('/', (req, res) => {
    res.send('Hello from Music Service!');
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', uploadRoutes);

// Lắng nghe cổng
app.listen(port, () => {
    console.log(`Music Service listening at http://localhost:${port}`);
});