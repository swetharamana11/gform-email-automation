const nodemailer = require("nodemailer");

const payload = JSON.parse(process.env.PAYLOAD);

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASSWORD
  }
});

transporter.sendMail({
  from: `"Form Team" <${process.env.MAIL_FROM}>`,
  to: payload.email,
  subject: "Thanks for your response!",
  html: `
    <p>Hi ${payload.name},</p>
    <p>This email is sent from our college Outlook account.</p>
    <p>Regards,<br/>Team</p>
  `
});
