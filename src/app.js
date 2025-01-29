const express = require('express');
const { connectDB } = require('./config/database')
const User = require('./models/user')
const { validateSignupData ,validateLoginData} = require('../src/utils/validation')
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.post('/signup', async (req, res) => {



    try {
        //validate the data
        validateSignupData(req.body)

        // encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10)
        // Store hash in your password DB.;

        const user = new User(
            {
                firstName,
                lastName,
                emailId,
                password: hashPassword
            }
        )

        await user.save()
        res.send('user added successfully')
    } catch (err) {
        res.status(400).send("Error " + err.message)
    }
})
app.post('/login',async(req,res)=>{
    try{
        validateLoginData(req.body)
        const {emailId,password}=req.body;
        const user= await User.findOne({emailId:emailId})
        
        if(!user){
            throw new Error("invalid credential");
        }
        const isPasswordValid=await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)

        if(isPasswordValid){
            res.status(200).send("login succesfully") 
        }
        else{
            throw new Error("invalid credential");
        }


    }catch(err){
        res.status(400).send("Error " + err.message)  
    }


})

app.get('/user', async (req, res) => {
    try {
        const userEmail = req.body.emailId;
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
        const Userid = req.body.userId
        console.log(Userid)
        const user = await User.findByIdAndDelete(Userid);
        // User.findByIdAndDelete({_id:Userid});

        res.send("data deleted successfully")

    } catch (err) {
        res.send("something went wrong" + err.message)
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
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
    console.log(userId)

    try {

        const ALLOWED_UPDATES = ["skills", "age", "gender", "photoUrl", "aboutMe", "password", "firstName", "lastName",]

        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );


        if (!isUpdateAllowed) {
            throw new Error("update not allowed")
        }
        if (data.skills?.length > 10) {
            throw new Error("skills cant be more than 10")
        }
        await User.findByIdAndUpdate({ _id: userId }, req.body, { runValidators: true })
        console.log(req.body)
        res.status(200).send("user updated successfully")
    } catch (err) {
        res.status(404).send("something went wrong " + err.message)
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

