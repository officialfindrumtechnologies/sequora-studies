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

export function emailVerification({ email, confirmUrl, actionType = 'signup' }) {
  const isReset   = actionType === 'recovery';
  const isMagic   = actionType === 'magiclink';
  const heading   = isReset  ? 'Reset your password'
                  : isMagic  ? 'Your sign-in link'
                  :            'Verify your Sequora account';
  const ctaLabel  = isReset  ? 'Reset password →'
                  : isMagic  ? 'Sign in to Sequora →'
                  :            'Verify email →';
  const bodyText  = isReset
    ? 'Click below to set a new password for your Sequora account. This link expires in 1 hour.'
    : isMagic
    ? 'Click below to sign in to Sequora. This link expires in 1 hour.'
    : 'Click below to verify your email address and start tracking your studies.';

  return send({
    to: email,
    subject: heading,
    html: layout(`
      ${h1(heading)}
      ${p(bodyText)}
      <p style="margin:20px 0 8px 0;text-align:center">
        ${cta(ctaLabel, confirmUrl)}
      </p>
      ${p('<span style="font-size:12px;color:#9b9184">If you didn\'t create an account or request this email, you can safely ignore it.</span>')}
    `),
  });
}

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

export function emailWeeklyReport({ email, displayName, stats }) {
  const {
    studyHours = 0,
    sessionsCount = 0,
    topicsStudied = 0,
    recallsDue = 0,
    streakDays = 0,
    topSubject = null,
    examDaysLeft = null,
    weeklyGoalMet = false,
  } = stats;

  const now = new Date();
  const weekStart = new Date(now.getTime() - 7 * 86_400_000);
  const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const dateRange = `${fmt(weekStart)} – ${fmt(now)}`;
  const hoursDisplay = studyHours.toFixed(1);

  const motivation =
    studyHours >= 10 ? 'Exceptional week. You\'re ahead of the curve.'
    : studyHours >= 5 ? 'Solid week. Keep the momentum going.'
    : studyHours >= 2 ? 'Good start. Try to push for more consistency.'
    : 'Quiet week. Even 30 minutes a day adds up.';

  const examBlock = examDaysLeft !== null && examDaysLeft > 0
    ? `<div style="margin:20px 0;padding:14px 18px;background:rgba(232,163,61,0.08);border:1px solid rgba(232,163,61,0.25);border-radius:8px">
        <div style="font-family:monospace;font-size:11px;color:#9b9184;letter-spacing:.08em;margin-bottom:4px">EXAM COUNTDOWN</div>
        <div style="font-size:22px;font-weight:700;color:#f0c277">${examDaysLeft} days</div>
        <div style="font-size:12px;color:#9b9184;margin-top:2px">until your exam</div>
      </div>`
    : '';

  const topSubjectBlock = topSubject
    ? `<div style="margin:16px 0;padding:12px 16px;background:#222018;border-radius:8px;border:1px solid #332d26">
        <div style="font-family:monospace;font-size:10px;color:#9b9184;letter-spacing:.1em;margin-bottom:4px">TOP SUBJECT THIS WEEK</div>
        <div style="font-size:16px;font-weight:700;color:#f0c277">${topSubject}</div>
      </div>`
    : '';

  return send({
    to: email,
    subject: `Your Sequora week — ${dateRange}`,
    html: layout(`
      ${h1(`Hi ${displayName || 'there'},`)}

      <div style="text-align:center;margin:24px 0 20px">
        <div style="font-family:monospace;font-size:11px;color:#9b9184;letter-spacing:.1em;margin-bottom:6px">HOURS STUDIED THIS WEEK</div>
        <div style="font-size:52px;font-weight:700;color:${weeklyGoalMet ? '#e8a33d' : '#f4ece0'};line-height:1">${hoursDisplay}</div>
        <div style="font-size:14px;color:#9b9184;margin-top:4px">hours</div>
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0">
        <tr>
          <td width="25%" style="text-align:center;padding:12px 8px;background:#222018;border-radius:8px 0 0 8px;border:1px solid #332d26;border-right:none">
            <div style="font-size:22px;font-weight:700;color:#f4ece0;font-family:monospace">${sessionsCount}</div>
            <div style="font-size:10px;color:#9b9184;margin-top:3px;letter-spacing:.05em">SESSIONS</div>
          </td>
          <td width="25%" style="text-align:center;padding:12px 8px;background:#222018;border:1px solid #332d26;border-right:none">
            <div style="font-size:22px;font-weight:700;color:#f4ece0;font-family:monospace">${topicsStudied}</div>
            <div style="font-size:10px;color:#9b9184;margin-top:3px;letter-spacing:.05em">SUBJECTS</div>
          </td>
          <td width="25%" style="text-align:center;padding:12px 8px;background:#222018;border:1px solid #332d26;border-right:none">
            <div style="font-size:22px;font-weight:700;color:#f4ece0;font-family:monospace">${streakDays}</div>
            <div style="font-size:10px;color:#9b9184;margin-top:3px;letter-spacing:.05em">DAY STREAK</div>
          </td>
          <td width="25%" style="text-align:center;padding:12px 8px;background:#222018;border-radius:0 8px 8px 0;border:1px solid #332d26">
            <div style="font-size:22px;font-weight:700;color:${recallsDue > 0 ? '#f87171' : '#f4ece0'};font-family:monospace">${recallsDue}</div>
            <div style="font-size:10px;color:#9b9184;margin-top:3px;letter-spacing:.05em">RECALLS DUE</div>
          </td>
        </tr>
      </table>

      ${topSubjectBlock}
      ${examBlock}

      ${p(`<em style="color:#cdc4b5">${motivation}</em>`)}

      <p style="margin:20px 0 8px 0;text-align:center">
        ${cta('Open Sequora →', 'https://sequora-studies.vercel.app/app')}
      </p>

      <p style="margin-top:24px;font-size:11px;color:#6b6359;text-align:center">
        You're receiving this because weekly reports are enabled for your account.<br>
        To unsubscribe, open Sequora → menu → Settings → Weekly email report.
      </p>
    `),
  });
}
