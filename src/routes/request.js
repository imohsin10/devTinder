const express=require('express')
const router=express.Router()
const {userAuth}=require('../../middleware/auth');
const connectionRequest = require('../models/connectionRequest');
router.post('/request/send/:status/:toUserId',userAuth,async (req,res)=>{
   try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;
    const allowedStatus=["ignored","interested"]
    if(!allowedStatus.includes(status)){
        return res.json({message:"invalid status type"})
    }
    const existRequest=await connectionRequest.findOne(
        { $or: [ {toUserId,fromUserId}, 
            {toUserId:fromUserId,fromUserId:toUserId}, ] }
    )

    if(existRequest){
        return res.json({message:"request already exist"})
    }
    const newConnectionRequest=new connectionRequest({
        fromUserId,
        toUserId,
        status

    })
    const data=await newConnectionRequest.save();
   
    res.json({
        message: `${req.user.firstName} sent the connection request`,
        data
    });

   }catch(err){
     res.status(400).send("Error " + err.message)
   }
})
module.exports=router;