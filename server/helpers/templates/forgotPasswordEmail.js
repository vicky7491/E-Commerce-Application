// helpers/templates/forgotPasswordEmail.js

const forgotPasswordEmail = ({ userName, resetUrl, appName }) => {
  const year      = new Date().getFullYear();
  const brand     = process.env.BRAND_COLOR    || "#b45309";
  const support   = process.env.SUPPORT_EMAIL  || "beautifulmolds@gmail.com";
  const logoUrl   = process.env.APP_LOGO_URL   || "";
  const name      = appName || process.env.APP_NAME || "Beautiful Molds";

  const logo = logoUrl
    ? `<img src="${logoUrl}" alt="${name}" height="36" style="display:block;margin:0 auto 14px;" />`
    : `<div style="width:44px;height:44px;background:${brand};border-radius:10px;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;">
        <span style="color:#fff;font-size:20px;font-weight:700;">${name.charAt(0)}</span>
       </div>`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="color-scheme" content="light"/>
  <meta name="supported-color-schemes" content="light"/>
  <title>Reset your password – ${name}</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0ede8;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0ede8;padding:40px 16px;">
  <tr><td align="center">

    <table role="presentation" width="600" cellpadding="0" cellspacing="0"
      style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e0ddd8;">

      <!-- ── Header ── -->
      <tr>
        <td style="background:#1c1917;padding:32px 40px;text-align:center;">
          ${logo}
          <div style="font-size:19px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;margin-bottom:4px;">${name}</div>
          <div style="font-size:11px;color:#a8a29e;letter-spacing:1.2px;text-transform:uppercase;">Account Security</div>
        </td>
      </tr>

      <!-- ── Body ── -->
      <tr>
        <td style="padding:40px 40px 32px;">

          <!-- Icon -->
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="background:#fef9ee;border-radius:12px;padding:12px;width:48px;height:48px;text-align:center;">
                <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
                  width="24" height="24" alt="" style="display:block;margin:0 auto;"
                  onerror="this.style.display='none'" />
              </td>
            </tr>
          </table>

          <!-- Heading -->
          <div style="font-size:24px;font-weight:700;color:#1c1917;letter-spacing:-0.5px;margin-bottom:10px;">
            Reset your password
          </div>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#57534e;">
            Hi <strong style="color:#1c1917;">${userName || "there"}</strong>,<br/>
            We received a request to reset the password associated with your
            <strong style="color:#1c1917;">${name}</strong> account.
            Click the button below to create a new password.
          </p>

          <!-- CTA Button -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr>
              <td align="center">
                <a href="${resetUrl}"
                  style="display:inline-block;background:${brand};color:#ffffff;font-size:15px;font-weight:700;
                  text-decoration:none;padding:15px 40px;border-radius:8px;letter-spacing:-0.1px;
                  mso-padding-alt:0;text-underline-color:${brand};">
                  <!--[if mso]><i style="letter-spacing:40px;mso-font-width:-100%;mso-text-raise:30pt">&nbsp;</i><![endif]-->
                  Reset my password
                  <!--[if mso]><i style="letter-spacing:40px;mso-font-width:-100%">&nbsp;</i><![endif]-->
                </a>
              </td>
            </tr>
          </table>

          <!-- Info box -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr>
              <td style="background:#f9f8f6;border-radius:8px;padding:16px 18px;border:1px solid #e7e5e4;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:10px;vertical-align:top;padding-top:1px;">
                      <div style="width:6px;height:6px;background:${brand};border-radius:50%;margin-top:6px;"></div>
                    </td>
                    <td style="font-size:13px;color:#57534e;line-height:1.65;">
                      This link expires in <strong style="color:#1c1917;">15 minutes.</strong>
                      If you didn't request a password reset, no action is needed —
                      your account remains secure.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Fallback URL -->
          <p style="margin:0 0 8px;font-size:12px;color:#a8a29e;text-transform:uppercase;letter-spacing:0.6px;">
            Or copy this link into your browser
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr>
              <td style="background:#f4f3f1;border-radius:6px;padding:12px 14px;border:1px solid #e7e5e4;
                font-family:monospace;font-size:11px;color:#57534e;word-break:break-all;">
                ${resetUrl}
              </td>
            </tr>
          </table>

          <!-- Sign off -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="border-top:1px solid #f0ede8;padding-top:24px;font-size:14px;color:#78716c;line-height:1.8;">
                Questions? Reach us at
                <a href="mailto:${support}" style="color:${brand};text-decoration:none;font-weight:600;">${support}</a>
                <br/>
                <span style="color:#a8a29e;">Warm regards, the ${name} team</span>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- ── Footer ── -->
      <tr>
        <td style="background:#f9f8f6;border-top:1px solid #f0ede8;padding:22px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;color:#a8a29e;">
            © ${year} ${name}. All rights reserved.
          </p>
          <p style="margin:0;font-size:11px;color:#c4c0bb;">
            This is an automated message — please do not reply directly to this email.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>

</body>
</html>`;
};

module.exports = forgotPasswordEmail;