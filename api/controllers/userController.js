import User from "../models/User.js";
import createError from "../utility/createError.js";
import { hasPassword } from "../utility/hasPassword.js";
import { verification_code } from "../utility/math.js";
import { activationLink, registeredAccount } from "../utility/sendMail.js";
import { createToken, verifyToken } from "../utility/token.js";
import {
  checkPassword,
  validateEmail,
  validateUsername,
} from "../utility/validate.js";

/**
 * @access public
 * @route /api/user/register
 * @method POST
 */
export const register = async (req, res, next) => {
  try {
    // get data from frontend
    const {
      first_name,
      sur_name,
      email,
      password,
      gander,
      birth_date,
      birth_month,
      birth_year,
    } = req.body;

    // validate register data
    if (!first_name || !sur_name || !email || !password || !gander) {
      return next(createError(400, "All field is mandatory!"));
    }
    // email validation
    if (!validateEmail(email)) {
      return next(createError(400, "Enter Valid Email!"));
    }

    // verify user Data is available
    const data = await User.findOne({ email: email });

    // check existing user is active or not
    if (!data) {
      // create Username
      let username = (first_name + sur_name).toLowerCase();
      let newUsername = await validateUsername(username);
      // create verification code
      const code = verification_code(10000, 99999);
      // create user
      const user = await User.create({
        first_name,
        sur_name,
        username: newUsername,
        email,
        password: hasPassword(password),
        gander,
        birth_date,
        birth_month,
        birth_year,
        access_token: code,
      });

      if (user) {
        // send activation link to new user
        const token = createToken({ id: user._id }, "20m");
        activationLink(user.email, {
          name: user.first_name,
          link: `${process.env.APP_URL}/api/v1/user/activation/${token}/activated`,
          code: code,
        });
        res
          .status(200)
          .cookie("OTP", user.email, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            user: user,
            token: token,
            message: "User Registration Success! Please Verify Account!",
          });
      }
    }

    if (data.isActivate == true) {
      return next(
        createError(
          400,
          "Already exist acount with this email. try another one!"
        )
      );
    } else {
      // update verification code and send email
      const update_verify_code = verification_code(10000, 99999);
      const update_v_code = await User.findByIdAndUpdate(data._id, {
        access_token: update_verify_code,
      });
      // send activation link to new user
      const user_token = createToken({ id: update_v_code._id }, "20m");
      activationLink(update_v_code.email, {
        name: update_v_code.first_name,
        link: `${process.env.APP_URL}/api/activation/${user_token}`,
        code: update_verify_code,
      });
      next(createError(400, "Account Exist! Please Verify the account!"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @access privet
 * @method POST
 * @route /api/user/resebd-code
 */
export const resendOtpCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    // verify account by email
    const user = await User.findOne().where({ email });

    if (!user) {
      return next(createError(400, "Your account is suspended!"));
    } else {
      // update verification code and send email
      const update_verify_code = verification_code(10000, 99999);

      const update_v_code = await User.findByIdAndUpdate(user._id, {
        access_token: update_verify_code,
      });
      // send activation link to new user
      const token = createToken({ id: user._id }, "15m");
      activationLink(user.email, {
        name: user.first_name,
        link: `${process.env.APP_URL}/api/v1/user/activation/${token}/activated`,
      });
      res
        .status(200)
        .cookie("OTP", user.email, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        .json({
          user: user,
          token: token,
          message: "Verification code Sent!",
        });
    }
  } catch (error) {
    next(error);
  }
};
/**Privet
 * @access publicotp-activation
 * @method POST
 */
export const activationOTP = async (req, res, next) => {
  try {
    const { code, email } = req.body;
    // verify account by email
    const verifyUser = await User.findOne()
      .where({ email })
      .and({ access_token: code });

    if (!verifyUser) {
      return next(createError(400, "Enter Valid Code!"));
    } else {
      const user = await User.findOneAndUpdate(
        { email },
        {
          access_token: "",
          isActivate: true,
        }
      );
      // aount registered email
      registeredAccount(user.email, {
        email: user.email,
      });
      res.status(200).json({
        user: user,
        message: "Verification Success!",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const activateUser = async (req, res, next) => {
  try {
    const { token } = req.params;
    // verify token with jWT
    const verify_token = verifyToken(token);

    if (verify_token) {
      const user = await User.findById(verify_token.id);

      if (!user) {
        return next(
          createError(404, "Not User Found With the verification Url")
        );
      } else {
        // Verify user with activation code

        if (user.isActivate == true) {
          return next(createError(400, "Invalid activation Link!"));
        } else {
          const { code } = req.body;
          if (!code) {
            return next(createError(400, "Enter Verification Code!"));
          } else {
            // search user with code
            const verify_code = await User.findOne({
              access_token: code,
            });

            if (!verify_code) {
              return next(createError(400, "Invalid Vrrification code!"));
            } else {
              // update User data
              const update_user = await User.findByIdAndUpdate(
                verify_code._id,
                {
                  access_token: "",
                  isActivate: true,
                }
              );
              res.status(200).json({
                message: "Acount Activated Successfully!",
              });
            }
          }
        }
      }
    } else {
      return next(createError(400, "Invalid Verification Url"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @access public
 * @route /api/user/login
 * @method POST
 */
export const Userlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // email validation
    if (!validateEmail(email)) {
      return next(createError(400, "Enter Valid Email!"));
    }
    // search User with email
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "Account does not Exist!"));
    } else {
      if (!user.isActivate) {
        // create verification code
        const code = verification_code(10000, 99999);
        // Update Verification code and send email
        const update_user = await User.findByIdAndUpdate(user._id, {
          access_token: code,
        });
        console.log(update_user);
        // send activation link to new user
        const new_token = createToken({ id: update_user._id }, "20m");
        activationLink(update_user.email, {
          name: update_user.first_name,
          link: `${process.env.APP_URL}api/v1/user/activation/${new_token}`,
          code: code,
        });
        res.status(200).json({
          message: "verification email sent",
          user: update_user,
          token: new_token,
        });
      } else {
        // check password
        let checkPass = await checkPassword(password, user.password);
        // validate password
        if (!checkPass) {
          return next(createError(400, "Wrong Password!"));
        }
        // create token
        const token = createToken({ id: user._id }, "365d");

        res.cookie("accessToken", token).status(200).json({
          user: user,
          accessToken: token,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @access public
 * @route /api/user/me
 * @method POST
 */
export const loggedInUser = async (req, res, next) => {
  try {
    // get tofken from headers
    const bearer_token = req.headers.authorization;
    const token = bearer_token.split(" ")[1];

    // verify token
    const verify_token = verifyToken(token);

    if (!verify_token) {
      return next(createError(404, "Invalid Token"));
    } else {
      // get user from database
      const logedIn_user = await User.findOne({ id: verify_token.id });
      if (!logedIn_user) {
        return next(createError(404, "No User Foound with token"));
      } else {
        res.status(200).json({
          message: "User Data Stable",
          user: logedIn_user,
        });
      }
    }
  } catch (error) {}
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    // verify token with jWT
    const { id } = verifyToken(token);

    // verify user
    const user = await User.findOne({ id });

    if (!user) {
      return next(createError(404, "Token is invalid."));
    }

    const { password } = req.body;
    if (user.password == password) {
      return next(
        createError(404, "Entered Old Password. Enter New Password!")
      );
    }

    const update_user = await User.findByIdAndUpdate(user._id, {
      password: password,
    });

    res.status(200).json({
      message: "password changed!",
      user: update_user,
    });
  } catch (error) {
    next(createError(404, "token is invalid"));
  }
};
/**
 * @access public
 * @route /api/user/acount/forgot
 * @method POST
 */
export const forgotPassword = async (req, res, next) => {
  try {
    // get email from the user
    const { email } = req.body;

    // email validation
    if (!validateEmail(email)) {
      return next(createError(400, "Enter Valid Email!"));
    }

    // get user with email
    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(404, "Account does not exist!"));
    } else {
      // update verification code and send email
      const update_verify_code = verification_code(10000, 99999);
      const update_user = await User.findByIdAndUpdate(user._id, {
        access_token: update_verify_code,
      });
      // send activation link to new user
      const user_token = createToken({ id: update_user._id }, "20m");
      activationLink(update_user.email, {
        name: update_user.first_name,
        link: `${process.env.APP_URL}/api/v1/user/activation/${user_token}`,
        code: update_verify_code,
      });
      res.json({
        message: "Verification Code Sent! Check the email!",
        user: update_user,
        token: user_token,
      });
    }
  } catch (error) {
    next(error);
  }
};
