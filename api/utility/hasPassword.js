
import bcrypt from 'bcryptjs'


/**
 * HAS Password with Bcryptjs
 * @param {*} password 
 * @returns 
 */
export const hasPassword = (password) => {

    return bcrypt.hashSync(password, 12)

}   
