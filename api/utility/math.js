
/**
 * Generate Random & Uniquw Code
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
export const verification_code = (min, max) => {

    return Math.floor(Math.random() * (max - min)) + min;
}