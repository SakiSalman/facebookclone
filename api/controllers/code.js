export const register = async (req, res, next) => {
  try {
    // get data from frontend
    const {
      first_name,
      sur_name,
      auth,
      password,
      gander,
      birth_date,
      birth_month,
      birth_year,
    } = req.body;

    // validate register data
    if (!first_name || !sur_name || !auth || !password || !gander) {
      return next(createError(400, "All field is mandatory!"));
    }
    const email = validateEmail(auth);
    const mobile = validateNumber(auth);

    // validation email or mobile

    if (email) {
      const emailUser = await User.findOne({ email: auth });

      // check available or not
      if (!emailUser) {
        // create Username
        let username = (first_name + sur_name).toLowerCase();
        let newUsername = await validateUsername(username);
        // create verification code
        const code = verification_code(10000, 99999);
        // create New user
        const newemailUser = await User.create({
          first_name,
          sur_name,
          username: newUsername,
          email: auth,
          password: hasPassword(password),
          gander,
          birth_date,
          birth_month,
          birth_year,
          access_token: code,
        });
        res
          .status(200)
          .cookie("OTP", emailUser.auth, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            user: newemailUser,
            token: token,
            message: "User Registration Success! Please Verify Account!",
          });
      }

      if (emailUser) {
        if (emailUser.isActivate == true) {
          return next(
            createError(
              400,
              "Already exist acount with this email. Try another one!"
            )
          );
        } else {
          // update verification code and send email
          const update_verify_code = verification_code(10000, 99999);
          const update_v_code = await User.findByIdAndUpdate(emailUser._id, {
            access_token: update_verify_code,
          });
          // send activation link to new user
          const user_token = createToken({ id: update_v_code._id }, "20m");
          activationLink(update_v_code.email, {
            name: update_v_code.first_name,
            link: `${process.env.APP_URL}/api/activation/${user_token}`,
            code: update_verify_code,
          });

          res
            .status(200)
            .cookie("OTP", update_v_code.email, {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .json({
              user: update_v_code,
              token: user_token,
              message: "User Registration Success! Please Verify Account!",
            });

          next(
            createError(
              400,
              "Account is Exist with this email! Please Verify the account!"
            )
          );
        }
      }
    } else if (mobile) {
      // check user with mobile
      const mobileUser = await User.findOne({ mobile: auth });
      // check available or not
      if (!mobileUser) {
        // create Username
        let username = (first_name + sur_name).toLowerCase();
        let newUsername = await validateUsername(username);
        // create verification code
        const code = verification_code(10000, 99999);
        // send Sms By mobile
        sendSMS(auth, `Your Facebook Pro Verification code is ${code}`);
        // create New user
        const newMobileUser = await User.create({
          first_name,
          sur_name,
          username: newUsername,
          mobile: auth,
          password: hasPassword(password),
          gander,
          birth_date,
          birth_month,
          birth_year,
          access_token: code,
        });
        res
          .status(200)
          .cookie("OTP", newMobileUser.mobile, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            user: newMobileUser,
            token: token,
            message: "User Registration Success! Please Verify Account!",
          });
      }

      if (mobileUser) {
        if (mobileUser.isActivate == true) {
          return next(
            createError(
              400,
              "Already exist acount with this Mobile Number. Try another one!"
            )
          );
        } else {
          // update verification code and send email
          const update_verify_code = verification_code(10000, 99999);
          const update_v_code = await User.findByIdAndUpdate(mobileUser._id, {
            access_token: update_verify_code,
          });
          // send activation link to new user
          const user_token = createToken({ id: update_v_code._id }, "20m");
          sendSMS(
            auth,
            `Your Facebook Pro Verification code is ${update_v_code}`
          );
          res
            .status(200)
            .cookie("OTP", mobileUser.mobile, {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .json({
              user: mobileUser,
              token: user_token,
              message: "User Registration Success! Please Verify Account!",
            });

          next(
            createError(
              400,
              "Account is Exist with this Mobile! Please Verify the account!"
            )
          );
        }
      }
    } else {
      return next(createError(400, "Enter Valid Email or Phone!"));
    }
  } catch (error) {
    next(error);
    console.log(error);
    res.send("hello");
  }
};
