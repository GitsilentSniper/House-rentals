const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rentalsRouter = require('./routes/rentals');
const chatsRouter = require('./routes/chats');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rentals', rentalsRouter);
app.use('/api/chats', chatsRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

