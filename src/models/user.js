const  mongoose=require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
         trim:true,
         validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("invalid email")
            }
         }
         },
    password:{
        type:String 
        ,required:true   ,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error ("please use strong password")
            }
         }  
    },
    photoUrl:{
        type: String,
        default:'https://www.pngwing.com/en/free-png-vowad',
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ("invalid url")
            }
         }
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
        validate(value){
            if(!["Male","Female","Others"].includes(value)){
                throw new Error(" Gender data is not valid");
                
            }
        }
    },
    skills:{
        type:[String]
    }
    


},{
    timestamps:true
})
userSchema.methods.getJWT=async function(){
    const user=this;
    const token= await jwt.sign({ _id: user._id }, 'mohsin@123',{ expiresIn: '1d' }

    );
    return token;
              
}
userSchema.methods.validatePassword=async function (passwordInputByUser) {
    const user=this;
    const hashedpassword= user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashedpassword

    );
    return isPasswordValid;
    
}

module.exports=mongoose.model("User",userSchema)
