const express=require('express')
const router=express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt');
const { validateSignupData, validateLoginData } = require('../utils/validation')
const {userAuth}=require('../../middleware/auth')
router.post('/signup', async (req, res) => {
 try {
    console.log(req.body)
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
router.post('/login', async (req, res) => {
    try {
        validateLoginData(req.body)
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("invalid credential");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT()
            res.cookie('token', token,{ expires: new Date(Date.now() + 900000)})
            res.status(200).send("login succesfully")
        }
        else {
            throw new Error("invalid credential");
        }


    } catch (err) {
        res.status(400).send("Error " + err.message)
    }


})
router.post('/logout', async (req, res) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()
        )
    })
    res.send("logout successfull! ")
   
});

module.exports=router;