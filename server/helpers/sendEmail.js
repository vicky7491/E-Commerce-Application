const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASS env variable is missing");
  }
  
 
    const transporter = nodemailer.createTransport({
      service: "gmail", // Gmail SMTP
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your Gmail App Password
      },
    });

    const mailOptions = {
      from: `"Beautiful Molds" <${process.env.EMAIL_USER}>`,
      to: email,        // ✅ fixed
      subject,          // ✅ fixed
      text: message,    // plain text version
      html: html || `<p>${message}</p>`, // ✅ fallback if no HTML is provided
    };

    try{
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;;
  }
};

module.exports = sendEmail;
