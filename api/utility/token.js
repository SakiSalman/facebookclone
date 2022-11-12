
import jwt from 'jsonwebtoken'


// create Access Token

export const createToken = (payload, exp) => {

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: exp });

    return token
}

// create Access Token

export const verifyToken = (token) => {

    const verify_data = jwt.verify(token, process.env.JWT_SECRET)

    return verify_data
}