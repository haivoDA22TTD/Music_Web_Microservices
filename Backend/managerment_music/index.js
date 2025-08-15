const express = require('express');
const cors = require("cors");
const db = require('./config/db.config');
const musicManagerRoutes = require('./routes/musicManager.routes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware để parse JSON
app.use(express.json());
app.use(cors());

// Route mẫu
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/api', musicManagerRoutes);

// Lắng nghe server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});