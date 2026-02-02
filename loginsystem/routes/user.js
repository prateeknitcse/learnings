const express=require('express');
const router=express.Router();
const {handleusersignup,handleuserlogin}=require('../controllers/user');
router.post('/',handleusersignup);



module.exports=router;