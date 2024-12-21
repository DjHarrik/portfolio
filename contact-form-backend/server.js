const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


app.use(bodyParser.json());
app.use(cors());

// POST endpoint for handling form submissions
app.post("/contact", async (req, res) => {
    console.log("Received data:", req.body); // Add this line

  const { name, email, mobile, subject, message } = req.body;

  if (!name || !email || !mobile || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    

    // Email options

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      text: `You have a new contact form submission:
      
      Name: ${name}
      Email: ${email}
      Mobile: ${mobile}
      Subject: ${subject}
      Message: ${message}`,
    };


    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    
    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
