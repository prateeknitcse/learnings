const express = require('express');
const { connectDB } = require('./connect');

const urlRoutes = require('./routes/url');
const app = express();
const PORT = 3002;

connectDB("mongodb://localhost:27017/urlshortner");
app.use(express.json());
app.use('/url', urlRoutes);

app

app.listen(PORT, () => {console.log(`URL Shortener service running on port ${PORT}`);});