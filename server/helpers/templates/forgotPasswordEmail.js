// helpers/templates/forgotPasswordEmail.js

const forgotPasswordEmail = ({ userName, resetUrl, appName }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Password Reset</title>
<style>
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: #f5f7fa;
    margin: 0;
    padding: 0;
    color: #1f2937;
  }
  .container {
    max-width: 650px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  }
  .header {
    background-color: #1e40af;
    color: #ffffff;
    text-align: center;
    padding: 40px 20px;
  }
  .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
  .header p { margin-top: 8px; font-size: 16px; }
  .content { padding: 40px 30px; line-height: 1.6; }
  .content p { margin: 15px 0; color: #374151; }
  .button {
    display: inline-block;
    padding: 14px 28px;
    margin: 25px 0;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    text-decoration: none;
    border-radius: 8px;
    background-color: #2563eb;
    transition: all 0.3s ease;
  }
  .button:hover { background-color: #1d4ed8; transform: translateY(-1px); }
  .link-copy {
    word-break: break-word;
    background: #f3f4f6;
    padding: 15px;
    border-radius: 8px;
    font-family: monospace;
    font-size: 14px;
    margin-top: 10px;
    color: #111827;
  }
  .footer { text-align: center; padding: 25px 20px; font-size: 12px; color: #6b7280; }
  .warning {
    border-left: 4px solid #fbbf24;
    background: #fef9c3;
    padding: 15px;
    border-radius: 6px;
    margin-top: 20px;
    font-size: 14px;
    color: #78350f;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${appName}</h1>
      <p>Password Reset Request</p>
    </div>
    <div class="content">
      <p>Hello ${userName || "there"},</p>
      <p>We received a request to reset your password for your <strong>${appName}</strong> account.</p>
      <p style="text-align:center;">
        <a href="${resetUrl}" class="button">Reset Password</a>
      </p>
      <p>If the button above doesn't work, copy and paste this link into your browser:</p>
      <div class="link-copy">${resetUrl}</div>
      <div class="warning">
        <strong>Important:</strong> This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
      </div>
      <p>If you have questions, contact our support team.</p>
      <p>Best regards,<br>The ${appName} Team</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
      <p>This is an automated message. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
  `;
};

module.exports = forgotPasswordEmail;
