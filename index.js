const express =require('express')
require("dotenv").config();
const app =express();

app.get("/welcome",(req,res)=>{
 res.send("Welcome to the world of IT")
})


app.get("/goodBye",(req,res)=>{
    res.send("goodBye this is the last lecture of this unit ")
})

 const PORT =process.env.PORT;
app.listen(PORT, ()=>{
    try {
        console.log("connected to port "+PORT)
    } catch (error) {
    console.log("not able to connect to port")        
    }
})