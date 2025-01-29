const validator = require('validator')


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
const validateLoginData=(data)=>{
    const {emailId}=data
    if (!validator.isEmail(emailId)) {
        throw new Error(" Please enter vallid email")
    }
}
module.exports={
    validateSignupData,
    validateLoginData,
}