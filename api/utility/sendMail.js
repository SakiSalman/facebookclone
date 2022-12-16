import nodeMailer from "nodemailer";
import createError from "./createError.js";

/**
 * Send Verification Link
 * @param {*} to
 * @param {*} data
 */
export const activationLink = async (to, data) => {
  try {
    // create transporter
    let transport = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ID, // google user
        pass: process.env.MAIL_PASS, // generated google app password
      },
    });

    //   send mail via smtp

    await transport.sendMail({
      from: `Facebook Pro <${process.env.MAIL_ID}>`,
      to: to,
      subject: "Acount activtion",
      html: `<body style="padding:0;margin:0;"> <center class="wrapper" style="width:100%;table-layout:fixed;background-color:#ddd;padding-top:30px;padding-bottom:30px;"> <table class="main" style="background-color:#fff;color:rgb(37, 36, 36);width:100%;max-width:600px;margin:0 auto;border-spacing:0;font-family:sans-serif;padding: 20px;"> <!-- Header section --> <tr> <td height="16" style="padding:0;background-color: #fff;" class="header-section"> <table width="100%" style="border-spacing:0;"> <tr> <td class="two-collum" style="padding:0;text-align:left;"> <table width="100%" style="border-spacing:0;border-bottom: 1px solid #ddd;"> <tr> <td class="colum1" style="padding:0;width:100%;max-width:80px;height:100%;display:inline-block;vertical-align:top;"> <a href="http://localhost:3000/" style="text-decoration:none;"> <img style="border:0;padding-top: 10px;" width="50"  src="https://i.ibb.co/YQDGnfX/Facebook-logo.png" alt="Facebook-logo" border="0"> </a> </td> <td class="colum2" style="padding:0;width:100%;max-width:450px;display:inline-block;vertical-align:top;"> <h4 style="color: #2377f2;" class="header-tittle">Action required: Confirm Your Facebook Pro Account</h4> </td> </tr> </table> </td> </tr> </table> </td> </tr> <!-- body Section --> <tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 0 10px;"> <tr> <td class="recever-name" style="padding:0;"> <p style="color: rgb(35, 35, 35);">Hi, ${data.name}</p> </td> </tr> </table> </td> </tr> <tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 0 10px;"> <tr> <td class="message-name" style="padding:0;"> <p style="color: rgb(35, 35, 35); margin: 0;">You recently Registered for Facebook Pro, To complete your Facebook Pro registration, please  confirm your account</p> </td> </tr> </table> </td> </tr> <tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 30px 10px;"> <tr> <td class="message-name" style="padding:0;"> <a href="${data.link}" style="cursor:pointer; padding: 10px; background-color:#2377f2; color:#fff;border: none; outline: none; border-radius: 4px;" >Confirm Your Account</a> </td> </tr> </table> </td> </tr> <tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 0 10px;"> <tr> <td class="message-name" style="padding:0;"> <p style="color: rgb(35, 35, 35); margin: 0;">You maybe asked for this confirmation code</p> </td> </tr> </table> </td> </tr> <tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 30px 10px;"> <tr> <td class="message-name" style="padding:0;"> <a href="#" style="text-decoration:none;"> <button style="padding: 10px; background-color:#f1f2f4; color:rgb(7, 0, 0);border: none; outline: none; border-radius: 4px; cursor: pointer; font-size: 20px; letter-spacing: 3px;">${data.code}</button></a> </td> </tr> </table> </td> </tr> <tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 0 10px;"> <tr> <td class="message-name" style="padding:0;"> <p style="color: rgb(157, 157, 157); font-weight: 300; margin: 0;">Facebook Pro helps you communicate and stay in touch with all of your friends. once you're joined Facebook Pro. You will be able to share photoes, plan events and more.</p> </td> </tr> </table> </td> </tr> <!-- body Section --> <!-- footer section --> <tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 0 10px; border-top: 1px solid #ddd; margin-top: 40px;"> <tr> <td class="recever-name" style="padding:0;"> <p style="color: rgb(35, 35, 35); font-size: 13px;">This message was sent to <span style="color:#2377f2;">${to}</span> at your request</p> </td> </tr> </table> </td> </tr> </table> </center> </body>`,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Resend Code
 * @param {*} to
 * @param {*} data
 */

export const registeredAccount = async (to, data) => {
  try {
    // create transporter
    let transport = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ID, // google user
        pass: process.env.MAIL_PASS, // generated google app password
      },
    });

    //   send mail via smtp

    await transport.sendMail({
      from: `Facebook Pro <${process.env.MAIL_ID}>`,
      to: to,
      subject: "Acount Registered!",
      html: `<body style="padding:0;margin:0;"> <center class="wrapper" style="width:100%;table-layout:fixed;background-color:#ddd;padding-top:30px;padding-bottom:30px;"> <table class="main" style="background-color:#fff;color:rgb(37, 36, 36);width:100%;max-width:600px;margin:0 auto;border-spacing:0;font-family:sans-serif;padding: 20px;"> <tr> <td height="16" style="padding:0;background-color: #fff;" class="header-section"> <table width="100%" style="border-spacing:0;"> <tr> <td class="two-collum" style="padding:0;text-align:left;"> <table width="100%" style="border-spacing:0;border-bottom: 1px solid #ddd;"> <tr> <td class="colum1" style="padding:0;width:100%;max-width:50px;height:100%;display:inline-block;vertical-align:top;"> <a href="http://localhost:3000/" style="text-decoration:none;"> <img style="border:0;padding-top: 10px;" width="40" src="https://i.ibb.co/YQDGnfX/Facebook-logo.png" alt="Facebook-logo" border="0"> </a> </td><td class="colum2" style="padding:0;width:100%;max-width:400px;display:inline-block;vertical-align:top;"> <h4 style="color: #2377f2;" class="header-tittle">Facebook Pro</h4> </td></tr></table> </td></tr></table> </td></tr><tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 0 10px;"> <tr> <td class="recever-name" style="padding:0;"> <p style="color: rgb(35, 35, 35);">Your account has been created- now it will be easier than ever to share and connect with your friends and family. </p></td></tr></table> </td></tr><tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 0 10px;"> <tr> <td class="message-name" style="padding:0;"> <p style="color: rgb(35, 35, 35); margin: 0;">Here are three ways for you to get the most out of it.</p></td></tr></table> </td></tr><tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 0 10px; margin: 30px 0; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"> <tr> <td class="message-name" style="padding:0;"> <table width="100%" style="border-spacing:0; margin: 10px 0; "> <tr> <td class="colum2" style="padding:0;width:100%;max-width:60px;display:inline-block;vertical-align:top;"> <img style="width: 40px;" src="https://i.ibb.co/vkPCx8c/searching.png" alt="searching" border="0"> </td><td class="colum1" style="padding:0;width:100%;max-width:450px;height:100%;display:inline-block;vertical-align:top;"> <h4 style="color: #2377f2; margin: 0;">Find People You Know</h4> <p style="color: #8f9091; margin: 0;">Find Friends and Family on Facebook Pro using our simple tools</p></td></tr></table> <table width="100%" style="border-spacing:0; margin: 10px 0; "> <tr> <td class="colum2" style="padding:0;width:100%;max-width:60px;display:inline-block;vertical-align:top;"> <img style="width: 40px;" src="https://i.ibb.co/wzRLW9C/upload.png" alt="upload" border="0"> </td><td class="colum1" style="padding:0;width:100%;max-width:450px;height:100%;display:inline-block;vertical-align:top;"> <h4 style="color: #2377f2; margin: 0;">Upload a Profile Photo</h4> <p style="color: #8f9091; margin: 0;"> Personalise your profile photo and help friends to recognise you</p></td></tr></table> <table width="100%" style="border-spacing:0; margin: 10px 0; "> <tr> <td class="colum2" style="padding:0;width:100%;max-width:60px;display:inline-block;vertical-align:top;"> <img style="width: 40px;" src="https://i.ibb.co/Mf016GS/pencil.png" alt="searching" border="0"> </td><td class="colum1" style="padding:0;width:100%;max-width:450px;height:100%;display:inline-block;vertical-align:top;"> <h4 style="color: #2377f2; margin: 0;">Edit your profile </h4> <p style="color: #8f9091; margin: 0;">Descripbe pesonal interests, contact information and affiliations</p></td></tr></table> </td></tr></table> </td></tr><tr> <td class="body-section" style="padding:0;background-color: #fff;"> <table width="100%" style="border-spacing:0;padding: 0 10px; border-top: 1px solid rgb(236, 234, 234); margin-top: 40px;"> <tr> <td class="recever-name" style="padding:0;"> <p style="color: rgb(35, 35, 35); font-size: 13px;">This message was sent to <span style="color:#2377f2;">${data.email}</span> at your request</p></td></tr></table> </td></tr></table> </center> </body>`,
    });
  } catch (error) {
    console.log(error);
  }
};