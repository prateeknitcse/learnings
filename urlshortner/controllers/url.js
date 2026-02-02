const { nanoid } = require('nanoid');
const Url = require('../models/url');
async function generateShortUrl(req, res){
   const body = req.body;
   if(!body.url) return res.status(400).json({ error: "URL is required" });
    const shortID = nanoid(8);
    await Url.create({
        shortId: shortID,
       redirectURL: body.url,
       visitHistory: [],
    });

   return res.json({id : shortID})


    
}
module.exports = {generateShortUrl};