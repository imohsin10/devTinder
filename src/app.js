const express=require ('express');
const {connectDB}=require('./config/database')
const app=express();
const User=require('./models/user')
app.use(express.json())

app.get('/user',async (req,res)=>{
   try{
    const userEmail=req.body.emailId;
    console.log(userEmail)
    const user= await User.findOne({emailId:userEmail});
    console.log(user)
    res.send(user)

   }catch(err){
    res.status(404).send("something went wrong")
   }


})
app.get('/feed',async (req,res)=>{
    try{
   
     const user= await User.find({});
     console.log(user)
     res.send(user)
 
    }catch(err){
     res.status(404).send("something went wrong")
    }
 
 
 })

app.post('/signup',async(req,res)=>{
    const user = new User (
        req.body
    )
    
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

