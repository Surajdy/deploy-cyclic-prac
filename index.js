
const express = require('express');
const { connection } = require('./db');
const mongoose = require('mongoose'); // Add this line
const cors = require('cors');

const cartRoutes = require('./routes/cart.routes'); // Correct import path
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken')
const {Usermodel} =require('./model/user.model')


const app = express();
app.use(express.json());
app.use(cors());

app.get('/',async (req,res)=>{
  res.send("app isworking")
})
app.post("/signup",async(req,res)=>{
  const {name, email, password}=req.body;
  console.log(name,email,password);
  bcrypt.hash(password,4,async function(err,hash){
   await Usermodel.create({
       name:name,
       email:email,
       password:hash,
      })
      res.send({ message: "Signup successed" })
  })
  
  
  
})

app.post("/signin",async(req,res)=>{
   const{email,password}=req.body;

   const user=await Usermodel.findOne({email});
   if(!user){
       res.send("invalid credientials")
   }
   const hashed_password =user.password;
   bcrypt.compare(password,hashed_password ,function(err,result){
       if(result){
           const token = jwt.sign({ userID:user._id}, 'shhhhh');
           console.log(token);

           return res.send({message:"Signin successd",token:token})
       }else{
           res.send({ message: "Invalid credientials" })
       }
   })

})


// app.get('/api/trending', async (req, res) => {
//     try {
//       const trendingData = await Trendingmodel.find();
//       res.json(trendingData);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  
  app.use('/api', cartRoutes);
  
  app.listen(8000, () => {
    try {
      connection;
      console.log("connected to server");
    } catch (error) {
      console.log("unable to connect to server");
    }
  });