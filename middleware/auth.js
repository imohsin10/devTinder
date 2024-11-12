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
const userAuth=(req,res,next)=>{ const token='qwe'
    const isAuthorized=token==='qwe';
 
    if(!isAuthorized){
        console.log("err")
        res.send('you are not authorized to get data')

    }else{
        console.log("middleware is processing")
        next()
    }
}


module.exports={adminAuth,userAuth

}