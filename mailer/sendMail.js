import nodemailer from "nodemailer";

const { email, name } = JSON.parse(process.env.PAYLOAD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASSWORD
  }
});

await transporter.sendMail({
  from: `"My Team" <${process.env.MAIL_FROM}>`,
  to: email,
  subject: "Thanks for your response!",
  html: `
    <p>Hi ${name},</p>
    <p>Thanks for filling our form.</p>
    <p>This is just a test to see if it works well.</p>
  `
});
