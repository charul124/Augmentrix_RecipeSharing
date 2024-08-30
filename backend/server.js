const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require("./config/db");
dotenv.config();
mongoose.set('debug', true);
connectDB();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// const connectDB = require('./config/db');

const recipeRoutes = require('./routes/recipeRoutes');
app.use('/api/recipes', recipeRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
