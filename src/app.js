const express=require ('express');
const app=express();

// will match all the method to /user
app.use("/test",(req,res)=>{
    res.send("test1")
})
// will match only get  method to /test
app.get("/user",(req,res)=>{
    res.send({firstname:"moh",age:17})

})
app.post("/user",(req,res)=>{
    res.send("data saved succesfully")
})
app.listen(3000,()=>{
    console.log("server is succesfully running on port 3000")
})