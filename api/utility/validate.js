import User from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * Validate Email
 * @param {*} email
 * @returns
 */
export const validateEmail = (email) => {
  let validEmail = email
    .toLowerCase()
    .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  if (validEmail) {
    return true;
  } else {
    return false;
  }
};
/**
 * Validate Phone Number
 * @param {*} cell
 * @returns
 */

export const validateNumber = (cell) => {
  let validNum = cell.match(/^(01|8801|\+8801)[0-9]{9}$/);

  if (validNum) {
    return true;
  } else {
    return false;
  }
};

/**
 * Genrate Unique username and validate
 * @param {*} username
 * @returns
 */
export const validateUsername = async (username) => {
  // create Unique Username
  let split_name = username.split(" ").join("");
  // create Unique Username
  let newname =
    split_name + (+new Date() * Math.random()).toString().substring(0, 1);
  // check Username in database
  let checkUsername = await User.findOne({ username: newname });

  if (checkUsername) {
    return (newname += (+new Date() * Math.random())
      .toString()
      .substring(0, 1));
  } else {
    return newname;
  }
};

/**
 * Check Password With Bcrypt
 * @param {*} password
 * @param {*} haspass
 * @returns
 */

export const checkPassword = async (userPassword, haspass) => {
  return await bcrypt.compare(userPassword, haspass);
};
