const express=require('express')
const router=express.Router()
const User = require('../models/user')
const { validateSignupData, validateLoginData ,validateProfileEditData} = require('../utils/validation')
const {userAuth}=require('../../middleware/auth')
router.get('/profile',userAuth, async (req, res) => {
    try{
     const user=req.user;
      console.log(req)
     //validate token 
     res.status(200).send(user)
    }catch(err){
     res.status(400).send("Error " + err.message)
    }
 })
router.patch('/profile/edit', userAuth ,async (req, res) => {
 
  try {
     if(!validateProfileEditData(req)){
        
        throw new Error("invalid edit request")
     }else{
        const loggedInUser=req.user;
        Object.keys(req.body).every((k) =>(loggedInUser[k]=req.body[k]))
        await loggedInUser.save();
        

       
        res.json({message:`${loggedInUser.firstName}, your profile updated successfully`,data:loggedInUser})

     }
 
       
        
     } catch (err) {
         res.status(404).send("something went wrong " + err.message)
     }
 
 })
router.get('/user', async (req, res) => {
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
router.delete('/user', async (req, res) => {
    try {
        const Userid = req.body.userId
        const user = await User.findByIdAndDelete(Userid);
        // User.findByIdAndDelete({_id:Userid});

        res.send("data deleted successfully")

    } catch (err) {
        res.send("something went wrong" + err.message)
    }
})
router.get('/feed', async (req, res) => {
    try {

        const users = await User.find({});
        res.send(users)

    } catch (err) {
        res.status(404).send("something went wrong")
    }


})
module.exports=router;