const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true
    },
    redirectURL: {
      type: String,
      required: true
    },
    visitHistory: [
      {
        timestamp: { type: Date, default: Date.now },
        ip: String,
        country: String,
        city: String
      }
    ]
  },
  { timestamps: true }
);

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
