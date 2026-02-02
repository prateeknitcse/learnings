const express = require('express');
const { connectDB } = require('./connect');
const URL = require('./models/url');

const urlRoutes = require('./routes/url');
const app = express();
const PORT = 3002;

connectDB("mongodb://localhost:27017/urlshortner");
app.use(express.json());
app.use('/url', urlRoutes);

app.get('/:shortId', async (req, res) => {
    try {
        const { shortId } = req.params;
        console.log('GET handler called for shortId:', shortId);
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: new Date() } } },
            { new: true }
        );
        if (!entry) return res.status(404).json({ error: 'Short URL not found' });
        return res.redirect(entry.redirectURL);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {console.log(`URL Shortener service running on port ${PORT}`);});