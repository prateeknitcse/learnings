const mongoose=require('mongoose');
const usersschema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},
{timestamps:true});
const User=mongoose.model('User',usersschema);
module.exports=User;