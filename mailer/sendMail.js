const nodemailer = require("nodemailer");

const payload = JSON.parse(process.env.PAYLOAD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASSWORD
  }
});

transporter.sendMail({
  from: `"My Team" <${process.env.MAIL_FROM}>`,
  to: payload.email,
  subject: "Thanks for your response!",
  html: `
    <p>Hi ${payload.name},</p>
    <p>Thanks for filling our form.</p>
    <p>This is just a test email.</p>
  `
});
