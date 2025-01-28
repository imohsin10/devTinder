const  mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String  ,
        required:true ,
        unique: true,
        minLength:4,
        maxLength:100
    },
    lastName:{
        type:String      
    },
    emailId:{
         type: String, 
         required: true,
         unique: true,
         lowercase: true,
         trim:true
         },
    password:{
        type:String 
        ,required:true     
    },
    photoUrl:{
        type: String,
        default:'https://www.pngwing.com/en/free-png-vowad'
    },
    age:{
        type:Number  ,
        min:18   
    },
    aboutMe:{
        type : String,
        default: 'its default about me'

    },
    gender:{
        type:String  ,
       validate (value) {
        if(!["male","female","others"].includes(value)){
           throw new Error(" not allowed")
            
        }
       } 
    },


})
module.exports=mongoose.model("User",userSchema)
