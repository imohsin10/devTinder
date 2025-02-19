const { request } = require('express')
const validator = require('validator')
const bcrypt = require('bcrypt');


const validateSignupData = (data) => {
    const { firstName, lastName, emailId, password } = data

    if
        (!firstName || !lastName) {
        throw new Error(" Please enter first and last name")
    }
    if (!validator.isEmail(emailId)) {
        throw new Error(" Please enter vallid email")
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error(" Please enter strong password")
    }

}
const validateLoginData=(req)=>{
    const {emailId}=req
    if (!validator.isEmail(emailId)) {
        throw new Error(" Please enter vallid email")
    }
}
const validateProfileEditData=(req)=>{
    const ALLOWED_UPDATES = ["skills", "age", "gender", "photoUrl", "aboutMe", "firstName", "lastName",]
    const isUpdateAllowed = Object.keys(req.body).every((k) =>
        ALLOWED_UPDATES.includes(k)
    );
    return isUpdateAllowed;

}

module.exports={
    validateSignupData,
    validateLoginData,
    validateProfileEditData,
}