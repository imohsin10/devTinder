const express=require('express')
const router=express.Router()
const {userAuth}=require('../../middleware/auth')
router.post('/sendconnectionRequest',userAuth,(req,res)=>{
    const user=req.user;
   
    res.send(user.firstName+" send the connection request")
})
module.exports=router;