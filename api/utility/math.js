/**
 * Genrate verification code
 */

export const verification_code = (min, max) => {

    return Math.floor(Math.random() * (max - min) ) + min;
}