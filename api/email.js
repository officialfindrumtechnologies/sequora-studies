// Resend transactional email sender.
// All templates inline — no external template service needed.

const FROM = process.env.RESEND_FROM_EMAIL || 'Sequora Studies <noreply@sequorastudies.com>';
const RESEND_API = 'https://api.resend.com/emails';

async function send({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY not set — skipping email to', to);
    return { skipped: true };
  }

  const resp = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });

  const json = await resp.json();
  if (!resp.ok) {
    console.error('[Email] Resend error:', resp.status, JSON.stringify(json));
    throw new Error(`Resend error ${resp.status}: ${json.message || JSON.stringify(json)}`);
  }

  console.log('[Email] Sent:', subject, '→', to, '| id:', json.id);
  return json;
}

// ── shared layout ─────────────────────────────────────────────────────────────

function layout(content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sequora Studies</title>
</head>
<body style="margin:0;padding:0;background:#12100e;font-family:'Georgia',serif;color:#f4ece0">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#12100e;padding:32px 0">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">
      <!-- header -->
      <tr>
        <td style="padding:0 0 24px 0">
          <span style="font-family:'Georgia',serif;font-size:20px;color:#e8a33d;font-weight:700;letter-spacing:.02em">Sequora Studies</span>
        </td>
      </tr>
      <!-- body -->
      <tr>
        <td style="background:#1a1815;border:1px solid #332d26;border-radius:12px;padding:28px 32px">
          ${content}
        </td>
      </tr>
      <!-- footer -->
      <tr>
        <td style="padding:20px 0 0 0;color:#9b9184;font-size:12px;line-height:1.6">
          Sequora Studies · Dhaka, Bangladesh<br>
          Questions? Reply to this email or contact <a href="mailto:officialfindrumtechnologies@gmail.com" style="color:#e8a33d">officialfindrumtechnologies@gmail.com</a>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function h1(text) {
  return `<h1 style="margin:0 0 16px 0;font-size:22px;color:#f0c277;font-weight:700;line-height:1.3">${text}</h1>`;
}

function p(text) {
  return `<p style="margin:0 0 14px 0;font-size:15px;color:#cdc4b5;line-height:1.65">${text}</p>`;
}

function detail(label, value) {
  return `<tr>
    <td style="padding:6px 0;font-size:13px;color:#9b9184;width:130px;vertical-align:top">${label}</td>
    <td style="padding:6px 0;font-size:13px;color:#f4ece0;font-family:monospace">${value}</td>
  </tr>`;
}

function detailTable(rows) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;border-top:1px solid #332d26;border-bottom:1px solid #332d26">
    ${rows}
  </table>`;
}

function cta(label, href) {
  return `<a href="${href}" style="display:inline-block;margin-top:8px;padding:10px 22px;background:#e8a33d;color:#12100e;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;font-family:monospace">${label}</a>`;
}

// ── email templates ───────────────────────────────────────────────────────────

export function emailActivated({ email, planLabel, expiresAt }) {
  const expiryFmt = new Date(expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return send({
    to: email,
    subject: `Your Sequora ${planLabel} plan is now active`,
    html: layout(`
      ${h1('Your plan is active 🎉')}
      ${p('Your bKash payment has been verified. Your account has been upgraded.')}
      ${detailTable(`
        ${detail('Plan', planLabel)}
        ${detail('Active until', expiryFmt)}
      `)}
      ${p('You now have full access to topic tracking, spaced recall, and AI Advisor calls for your tier.')}
      ${cta('Open Sequora Studies →', 'https://sequorastudies.com/app')}
    `),
  });
}

export function emailSuspended({ email, reason }) {
  return send({
    to: email,
    subject: 'Your Sequora Studies account has been suspended',
    html: layout(`
      ${h1('Account suspended')}
      ${p('Your Sequora Studies account has been suspended.')}
      ${reason ? `${p(`Reason: ${reason}`)}` : ''}
      ${p('If you believe this is an error, please reply to this email or contact us directly.')}
      <a href="mailto:officialfindrumtechnologies@gmail.com" style="color:#e8a33d;font-size:14px">officialfindrumtechnologies@gmail.com</a>
    `),
  });
}

export function emailExpiryWarning({ email, planLabel, expiresAt }) {
  const expiryFmt = new Date(expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const daysLeft  = Math.ceil((new Date(expiresAt) - Date.now()) / 86_400_000);

  return send({
    to: email,
    subject: `Your Sequora plan expires in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
    html: layout(`
      ${h1(`Your plan expires in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`)}
      ${detailTable(`
        ${detail('Plan', planLabel)}
        ${detail('Expires', expiryFmt)}
      `)}
      ${p('Renew via bKash to keep full access to your tracker, spaced recall, and AI Advisor.')}
      ${p('Send payment to the bKash number in the app, then submit your TrxID in the Toolkit tab. Activation within 24 hours.')}
      ${cta('Renew now →', 'https://sequorastudies.com/app')}
    `),
  });
}

export function emailExpired({ email, planLabel }) {
  return send({
    to: email,
    subject: 'Your Sequora plan has expired',
    html: layout(`
      ${h1('Your plan has expired')}
      ${p(`Your ${planLabel} subscription has ended. Your data is safe — topics, sessions, and errors are all still there.`)}
      ${p('Your account has reverted to the free tier. Renew any time to restore full access.')}
      ${cta('Renew plan →', 'https://sequorastudies.com/app')}
      ${p('Need help? Reply to this email.')}
    `),
  });
}
