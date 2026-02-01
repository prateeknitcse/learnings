const shortId = require('shortid');
const Url = require('../models/url');
async function generateShortUrl(req, res){
   const body = req.body;
   if(!body.url) return res.status(400).json({ error: "URL is required" });
    const shortID = shortId();
    await Url.create({
        shortId: shortID,
       redirectURL: body.url,
       visitHistory: [],
    });

   return res.json({id : shortID})


    
}
module.exports = {generateShortUrl};