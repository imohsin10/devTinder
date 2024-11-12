const express=require ('express');
const app=express();


// will match only get  method to /test
app.get("/user/:userid",(req,res)=>{
   console.log(req.query) ;
   console.log(req.params) ;
    res.send({firstname:"moh",age:17})

})
app.listen(3000,()=>{
    console.log("server is succesfully running on port 3000")
})