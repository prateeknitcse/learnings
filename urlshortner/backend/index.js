const express = require('express');
const cors = require('cors');
const geoip = require('geoip-lite');
const { connectDB } = require('./connect');
const Url = require('./models/url');
const urlRoutes = require('./routes/url');

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());
connectDB("mongodb://127.0.0.1:27017/urlshortner");
app.use('/url', urlRoutes);
app.get('/:shortId', async (req, res) => {
  try {
    const { shortId } = req.params;
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket.remoteAddress;

    const geo = geoip.lookup(ip);

    const entry = await Url.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: new Date(),
            ip,
            country: geo?.country || "Unknown",
            city: geo?.city || "Unknown"
          }
        }
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
