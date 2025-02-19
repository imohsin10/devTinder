const express = require('express');
const { connectDB } = require('./config/database')
const User = require('./models/user')
const app = express();
const {userAuth}=require('../middleware/auth')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const authrouter=require('./routes/auth')
const profilerouter=require('./routes/profile')
const requestrouter=require('./routes/request')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/',authrouter)
app.use('/',profilerouter)
app.use('/',requestrouter)

app.delete('/user', async (req, res) => {
    try {
        const Userid = req.body.userId
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

