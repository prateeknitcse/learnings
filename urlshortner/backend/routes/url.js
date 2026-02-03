const express = require('express');
const router = express.Router();
const { generateShortUrl } = require('../controllers/url');
const Url = require('../models/url');


router.post('/', generateShortUrl);
router.get('/analytics/:shortId', async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
      shortId: url.shortId,
      redirectURL: url.redirectURL,
      totalClicks: url.visitHistory.length,
      visitHistory: url.visitHistory
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
