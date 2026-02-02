const User=require('../models/user');
async function handleusersignup(req, res) {
const { username, password } = req.body;
await User.create({ username, password });
res.json({ status: "ok" });
}

async function handleuserlogin(req, res) {
    res.send("User login handler");
}
module.exports={handleusersignup,handleuserlogin}