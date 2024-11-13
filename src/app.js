const express=require ('express');
const {connectDB}=require('./config/database')
const app=express();
const User=require('./models/user')

app.post('/signup',async(req,res)=>{
  
    const user = new User ({
        firstName:"lionel",
        lastName:"Messi",
        emailId:'mohsin@123gmail.com',
        password:"mohsin@123"

    })
    try{
        await user.save()
    res.send('user added')
    }catch(err){
        res.status(400).send("something went wring"+err.message)
    }
})



connectDB().then(()=>{
    console.log('connected succefully')
    app.listen(3000,()=>{
        console.log("server is succesfully running on port 3000")
    })
}).catch(err=>{
console.error(" database connection failed")
})

