const { nanoid } = require('nanoid');
const Url = require('../models/url');

async function generateShortUrl(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
    if (!/^https?:\/\//i.test(url)){
      return res.status(400).json({ error: "Invalid URL format" });
    }

    const shortId = nanoid(8);

    await Url.create({
      shortId,
      redirectURL: url,
      visitHistory: []
    });

    return res.status(201).json({ id: shortId });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { generateShortUrl };
