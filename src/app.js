const express=require ('express');
const app=express();

app.use("/hello",(req,res)=>{
    res.send("hello from the server and me")
})
app.use("/test",(req,res)=>{
    res.send("hello from the server")
})
app.listen(3000,()=>{
    console.log("server is succesfully running on port 3000")
})