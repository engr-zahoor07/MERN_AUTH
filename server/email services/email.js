const nodemailer = require("nodemailer");

//Creating Email Setting
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zahoorahmed54217@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

//Creating Sending Email
const sendEmail = async (to, subject, emailBody) => {
  let mailOptions = {
    to,
    from: "zahoorahmed54217@gmail.com",
    subject,
    html: emailBody,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
    });
  });
};
module.exports = sendEmail;
