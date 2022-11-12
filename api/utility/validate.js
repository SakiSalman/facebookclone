import User from "../models/User.js"
import bcrypt from 'bcryptjs'


// validate email


export const validateEmail = (email) => {

    let validEmail = email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

    if (validEmail) {
        return true
    }else{
        return false
    }
}
// validate phone

export const validatePhone = (email) => {

    let validEmail = email.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

    if (validEmail) {
        return true
    }else{
        return false
    }
}

// create Username
export const validateUsername = async (username) =>{
        // create Unique Username
        let split_name = username.split(' ').join('')
        // create Unique Username
        let newname = split_name + (+new Date()*Math.random()).toString().substring(0, 1)
        // check Username in database
        let checkUsername = await User.findOne({username : newname})

        if (checkUsername) {
           return newname +=(+new Date()*Math.random()).toString().substring(0, 1) 
        }else{
            return newname;
        }
}

// check password

export const checkPassword = async (password, haspass) => {

        
    return await bcrypt.compare(password, haspass);

}