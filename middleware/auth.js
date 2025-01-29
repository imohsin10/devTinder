const jwt = require('jsonwebtoken');
const User=require('../src/models/user')
const adminAuth=(req,res,next)=>{
    const token='qwe'
    const isAuthorized=token==='we';
 
    if(!isAuthorized){
        console.log("err")
        res.send('you are not authorized to get data')

    }else{
        console.log("middleware is processing")
        next()
    }
}
const userAuth=async (req,res,next)=>{ 
  try {
    const {token}=req.cookies;
    if(!token){
        throw new Error("invalid token")
    }
 
   const decodedToken= await jwt.verify(token, 'mohsin@123');
   const {_id}=decodedToken;
    const user= await User.findById({_id})
    if(!user){
        throw new error("invalid credential") 
    }else{
        req.user=user;
        next();
    }
  }catch(err)
  {
    res.status(400).send("Error " + err.message)
  }
 

}


module.exports={adminAuth,userAuth

}