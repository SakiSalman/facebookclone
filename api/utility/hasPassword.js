
import bcrypt from 'bcryptjs'

// Make password has


export const hasPassword = (password) => {

    return bcrypt.hashSync(password, 12)

}   
