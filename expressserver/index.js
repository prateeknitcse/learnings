const express = require('express');
const app = express();
app.get('/', (req, res) => {
     return res.send('Hello from Express server!');
});
app.get('/about', (req, res) => {
        return res.send('This is the about page.');
});

app.listen(5001, () => console.log('Express server is listening on port 5001'));