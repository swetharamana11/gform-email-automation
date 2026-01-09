const nodemailer = require("nodemailer");

const payload = JSON.parse(process.env.PAYLOAD);

/* =========================
   MAIL CONFIG (COMMON)
   ========================= */

const SUBJECT = "LIBAzaar Event Registration";
const FROM_NAME = "LIBAzaar";

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // change to gmail if needed
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASSWORD
  }
});

/* =========================
   EVENT BODY CONFIG
   ========================= */

let eventName = "";
let bodyContent = "";

/*
  RULE:
  - Use payload.teamName if event is team-based
  - Use payload.name if event is individual-based
*/

switch (payload.eventType) {

  /* -------- TEAM EVENTS -------- */

  case "fashion_show":
    eventName = "Fashion Show";
    bodyContent = `
      Name of the Team: ${payload.teamName}
      Event Name: Fashion Show
      Amount Paid: Rs. 1000/-
      Registration Status: Confirm
    `;
    break;

  case "group_dance":
    eventName = "Group Dance";
    bodyContent = `
      Name of the Team: ${payload.teamName}
      Event Name: Group Dance
      Amount Paid: Rs. 1000/-
      Registration Status: Confirm
    `;
    break;

  case "adapt_tune":
    eventName = "Adapt Tune";
    bodyContent = `
      Name of the Team: ${payload.teamName}
      Event Name: Adapt Tune
      Amount Paid: Rs. 200/-
      Registration Status: Confirm
    `;
    break;

    case "music_band":
    eventName = "Music Band";
    bodyContent = `
      Name of the Team: ${payload.teamName}
      Event Name: Music Band
      Amount Paid: Rs. 750/-
      Registration Status: Confirm
    `;
    break;

     case "channel_surfing":
    eventName = "Channel Surfing";
    bodyContent = `
      Name of the Team: ${payload.teamName}
      Event Name: Channel Surfing
      Amount Paid: Rs. 200/-
      Registration Status: Confirm
    `;
    break;

     case "potpourri":
    eventName = "Potpourri";
    bodyContent = `
      Name of the Team: ${payload.teamName}
      Event Name: Potpourri
      Amount Paid: Rs. 200/-
      Registration Status: Confirm
    `;
    break;

     case "video":
    eventName = "Video Creation";
    bodyContent = `
      Name of the Team: ${payload.teamName}
      Event Name: Video Creation
      Amount Paid: Rs. 150/-
      Registration Status: Confirm
    `;
    break;

  /* -------- INDIVIDUAL EVENTS -------- */

  case "music_solo":
    eventName = "Music Solo";
    bodyContent = `
      Participant Name: ${payload.name}
      Event Name: Music Solo
      Amount Paid: Rs. =200/-
      Registration Status: Confirm
    `;
    break;

  case "colouring6":
    eventName = "Colouring (4-6)";
    bodyContent = `
      Participant Name: ${payload.name}
      Event Name: Colouring (4-6)
      Amount Paid: Rs. 150/-
      Registration Status: Confirm
    `;
    break;

    case "colouring11":
    eventName = "Colouring (7-11)";
    bodyContent = `
      Participant Name: ${payload.name}
      Event Name: Colouring (7-11)
      Amount Paid: Rs. 150/-
      Registration Status: Confirm
    `;
    break;

    case "drawing":
    eventName = "Drawing Competition";
    bodyContent = `
      Participant Name: ${payload.name}
      Event Name: Drawing Competition
      Amount Paid: Rs. 150/-
      Registration Status: Confirm
    `;
    break;

    case "spell_bee":
    eventName = "Spell Bee";
    bodyContent = `
      Participant Name: ${payload.name}
      Event Name: Spell Bee
      Amount Paid: Rs. 150/-
      Registration Status: Confirm
    `;
    break;

    case "craft":
    eventName = "Craft Competition";
    bodyContent = `
      Participant Name: ${payload.name}
      Event Name: Craft Competition
      Amount Paid: Rs. 150/-
      Registration Status: Confirm
    `;
    break;

    case "shipwreck":
    eventName = "Shipwreck";
    bodyContent = `
      Participant Name: ${payload.name}
      Event Name: Shipwreck
      Amount Paid: Rs. 150/-
      Registration Status: Confirm
    `;
    break;

  /* -------- DEFAULT FALLBACK -------- */

  default:
    eventName = "LIBAzaar Event";
    bodyContent = `
      Participant Name: ${payload.name}
      Event Name: ${payload.eventType}
      Registration Status: Confirm
    `;
}

/* =========================
   FINAL MAIL BODY
   ========================= */

const finalBody = `
<p>Greetings,</p>

<p>Thank you for your registration in <b>LIBAzaar ‘26</b>! The event date is 
<b>1st February 2026 (Sunday)</b>. If you would like to know more about LIBAzaar 
and events do visit,</p>

<p>
  <a href="https://libazaar.liba.edu/index.html">
    https://libazaar.liba.edu/index.html
  </a>
</p>

<p>
  ${bodyContent.replace(/\n/g, "<br/>")}
</p>

<p>
  In case of queries contact the number given below -
  <br/>
  <b>Shreyaa J:</b> +91 98401 50554
  <br/>
  <b>Swetha R:</b> +91 9952002266
</p>

<p>
  Regards,
  <br/>
  <b>MARKIT</b>
  <br/>
  Marketing Club of LIBA
</p>
`;

/* =========================
   SEND MAIL + LOGGING
   ========================= */

try {
  transporter.sendMail({
    from: `"LIBAzaar" <${process.env.MAIL_FROM}>`,
    to: payload.email,
    subject: SUBJECT,
    html: finalBody
  });

  console.log(
    `MAIL_SENT | event=${payload.eventType} | email=${payload.email}`
  );

} catch (err) {
  console.error(
    `MAIL_FAILED | event=${payload.eventType} | email=${payload.email} | error=${err.message}`
  );
  throw err;
}
