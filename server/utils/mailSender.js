const nodemailer = require("nodemailer");

const mailsender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "tkapri799@gmail.com",
      to: email,
      subject: title,
      html: body,
    });
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = mailsender;
