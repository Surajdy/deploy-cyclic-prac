const jwt=require('jsonwebtoken')


const authentication =(req,res,next)=>{
   const token = req.headers.authorization?.split(" ")[1];

 if(!token){
    return res.send("invalid request login again")


 }

 jwt.verify(token, 'shhhhh', function(err, decoded) {
    // console.log(decoded.auth) 

    if(decoded){
        const userID =decoded.userID;
        req.userID =userID;
        res.send("authoriastion success");
        next();

    }
  });
}


module.exports={authentication};