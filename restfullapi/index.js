const express = require('express');
const users = require('./MOCK_DATArestfull.json');
const app = express();
const fs=require('fs');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mydatabase")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));


// schema
const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    job_title: {type: String, required: false},
    gender: {type: String, required: false}

});
const User = mongoose.model('user', userSchema);




app.use(express.urlencoded({ extended: false})
);
app.get('/users', (req, res) => {
    return res.json(users);
});

app.get('/api/users', (req, res) => {
    const html=`<html><body><h1>User List</h1><ul>${users.map(user=>`<li>${user.first_name} ${user.last_name} - ${user.email}</li>`).join('')}</ul></body></html>`;
    return res.send(html);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user.first_name + ' ' + user.last_name);
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push({...newUser, id: users.length + 1});
    fs.writeFile('./MOCK_DATArestfull.json', JSON.stringify(users), err => {
        return res.json({ status:"success",id: users.length });
    });
});

app.listen(3001, () => {console.log('Server is running on port 3001');});