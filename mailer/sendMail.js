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
  from: `"LIBAzaar Team" <${process.env.MAIL_FROM}>`,
  to: payload.email,
  subject: "LIBAzaar Event Registration Confirmation",
  html: `
    <p>Greetings,</p>

    <p>
      Thank you for your registration in <b>LIBAzaar ’26</b>! 
      The event date is <b>1st February 2026 (Sunday)</b>.
      If you would like to know more about LIBAzaar and events, do visit:
      <br/>
      <a href="https://libazaar.liba.edu/index.html">
        https://libazaar.liba.edu/index.html
      </a>
    </p>

    <p>
      <b>Name of the Team:</b> ${payload.teamName}<br/>
      <b>Event Name:</b> Fashion Show<br/>
      <b>Amount Paid:</b> Rs. 1000/-<br/>
      <b>Registration Status:</b> Confirm
    </p>

    <p>
      In case of queries, contact the number given below:
      <br/>
      <b>Shreyaa J:</b> +91 98401 50554<br/>
      <b>Swetha R:</b> +91 9952002266
    </p>

    <p>
      Regards,<br/>
      <b>MARKIT</b><br/>
      Marketing Club of LIBA
    </p>
  `
});
