const express=require ('express');
const {adminAuth,userAuth}=require('../middleware/auth')
const app=express();


app.use('/admin', adminAuth)
app.get('/user',userAuth,(req,res,next)=>{
    res.send({name:"me",age:12})
   })
app.get('/user',(req,res,next)=>{
 res.send({name:"me",age:12})
})

app.listen(3000,()=>{
    console.log("server is succesfully running on port 3000")
})