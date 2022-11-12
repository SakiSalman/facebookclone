import User from "../models/User.js";
import createError from "../utility/createError.js";
import { hasPassword } from "../utility/hasPassword.js";
import { verification_code } from "../utility/math.js";
import { activationLink } from "../utility/sendMail.js";
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
        if (data) {
            if (data.isActivate == true) {
                return next(
                    createError(
                        400,
                        "Already exist acount with this email. try another one!"
                    )
                );
            } else {
                // update verification code and send email
                const update_v_code = await User.findByIdAndUpdate(data._id, {
                    access_token: verification_code(10000, 99999),
                });
                // send activation link to new user
                const user_token = createToken({ id: update_v_code._id }, "20m");
                activationLink(update_v_code.email, {
                    name: update_v_code.first_name,
                    link: `${process.env.APP_URL}/api/activation/${user_token}`,
                    code: update_v_code,
                });
                res.json({
                    message:
                        "Acount already registered with this email. Verify The user Now!",
                    user: update_v_code,
                    token: user_token,
                });
            }
        } else {
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
                    link: `${process.env.APP_URL}api/v1/user/activation/${token}`,
                    code: code,
                });
                res.json({
                    user: user,
                    token: token,
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

/**
 * @access public
 * @route /api/user/activation/:token
 * @method GET
 */
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
 * @method GET
 */
export const loggedInUser = async (req, res, next) => {
    res.send("user login user done");
};
