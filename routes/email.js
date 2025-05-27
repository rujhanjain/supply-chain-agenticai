const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

router.post('/', async (req, res) => {
  const emails = req.body.emails;

  try {
    for (const email of emails) {
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email.to,  // ✅ Use the actual `to` field
            subject: email.subject,
            text: email.body
          });          
    }
    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send emails' });
  }
});

module.exports = router;