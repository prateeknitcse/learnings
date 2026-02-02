const express=require('express');
const app=express();
const {connectDB}=require('./connect');

const userRoutes=require('./routes/user');

app.use(express.json());
const PORT=8001;
connectDB("mongodb://localhost:27017/loginsystem");

app.use('/user',userRoutes);


app.listen(PORT,()=>{console.log(`Login system running on port ${PORT}`);});