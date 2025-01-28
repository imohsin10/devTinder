const express = require('express');
const { connectDB } = require('./config/database')
const app = express();
const User = require('./models/user')
app.use(express.json())

app.get('/user', async (req, res) => {
    try {
        const userEmail = req.body.emailId;
        console.log(userEmail)
        const users = await User.findOne({ emailId: userEmail });
        if (!users) {
            res.status(404).send("user not found")
        } else {
            res.send(users)
        }
    } catch (err) {
        res.status(404).send("something went wrong")
    }


})
app.delete('/user', async (req, res) => {
    try {
       const  Userid = req.body.userId
       console.log(Userid)
       const user= await User.findByIdAndDelete(Userid);
       // User.findByIdAndDelete({_id:Userid});

        res.send("data deleted successfully")

    } catch (err) {
        res.send("something went wrong"+err.message)
    }
})
app.get('/feed', async (req, res) => {
    try {

        const users = await User.find({});
        res.send(users)

    } catch (err) {
        res.status(404).send("something went wrong")
    }


})
app.patch('/user',async (req,res)=>{
    const userid=req.body.userId;
    //const objectId = new mongoose.Types.ObjectId(userid);
   try{

    await User.findByIdAndUpdate({ _id:userid },req.body)
    res.status(200).send("user updated successfully")
   }catch(err){
    res.status(404).send("something went wrong"+err.message)
   }

})

app.post('/signup', async (req, res) => {
    const user = new User(
        req.body
    )

    try {

        await user.save()
        res.send('user added successfully')
    } catch (err) {
        res.status(400).send("something went wring" + err.message)
    }
})



connectDB().then(() => {
    console.log('connected succefully')
    app.listen(3000, () => {
        console.log("server is succesfully running on port 3000")
    })
}).catch(err => {
    console.error(" database connection failed")
})

