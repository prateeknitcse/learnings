const express = require('express');
const app = express();
const PORT = 3002;

app.listen(PORT, () => {console.log(`URL Shortener service running on port ${PORT}`);});