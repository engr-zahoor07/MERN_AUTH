// const nodemailer = require("nodemailer");

// //Creating Email Setting
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "zahoorahmed54217@gmail.com",
//     pass: process.env.EMAIL_PASS,
//   },
// });

// //Creating Sending Email
// const sendEmail = async (to, subject, emailBody) => {
//   let mailOptions = {
//     to,
//     from: "zahoorahmed54217@gmail.com",
//     subject,
//     html: emailBody,
//   };

//   await new Promise((resolve, reject) => {
//     transporter.sendMail(mailOptions, (err, res) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       } else {
//         console.log(res);
//         resolve(res);
//       }
//     });
//   });
// };
// module.exports = sendEmail;
// ==============================SendGrde Email HTTPS Method===============

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    await sgMail.send({
      to,
      from: "zahoorahmed54217@gmail.com",
      subject,
      html,
    });

    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("EMAIL FAILED:", error.response?.body || error.message);
    throw error;
  }
};

module.exports = sendEmail;
