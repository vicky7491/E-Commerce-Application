// helpers/sendEmail.js
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, message, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      text: message,
      html: html || `<p>${message}</p>`,
    });

    if (error) {
      console.error("❌ Email sending failed:", error);
      throw new Error(error.message);
    }

    console.log("✅ Email sent:", data.id);
    return data;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

module.exports = sendEmail;