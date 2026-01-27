const http=require('http');
const fs=require('fs');
const myserver=http.createServer((req,res)=>{
    const ip= req.headers['x-forwarded-for']?.split(',')[0] ||
  req.socket.remoteAddress;

   fs.appendFile('log.txt',`user visited at ${new Date()} from IP: ${ip}\n`,(err,data)=>{
      if(err)console.log(err);
    res.end('thanks for clicking now you are fucked');
   });

});
myserver.listen(5000,()=>console.log('server is listening on port 5000'));