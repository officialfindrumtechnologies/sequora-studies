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
  const fmt = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const fmtShort = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const dateRange = `${fmtShort(weekStart)} – ${fmt(now)}`;
  const hoursDisplay = studyHours.toFixed(1);
  const name = displayName || 'there';

  const motivation =
    studyHours >= 10 ? 'Exceptional week. You\'re tracking above 95% of students.'
    : studyHours >= 5  ? 'Solid week. Consistency is building your edge.'
    : studyHours >= 2  ? 'Good progress. Push for one more session each day.'
    :                    'Every session counts. Open Sequora and study for 25 minutes today.';

  const topSubjectBlock = topSubject ? `
    <tr>
      <td style="padding:0 0 20px 0">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#111009;border:1px solid #2a2520;border-radius:8px">
          <tr>
            <td style="padding:18px 20px">
              <div style="font-family:'Courier New',Courier,monospace;font-size:10px;color:#4a4540;letter-spacing:.15em;margin-bottom:8px">TOP SUBJECT THIS WEEK</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;color:#f0c277">${topSubject}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>` : '';

  const examBlock = examDaysLeft !== null && examDaysLeft > 0 ? `
    <tr>
      <td style="padding:0 0 20px 0">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#1c1608;border:1px solid #3d2f0f;border-radius:8px">
          <tr>
            <td style="padding:18px 20px">
              <div style="font-family:'Courier New',Courier,monospace;font-size:10px;color:#7a5a1a;letter-spacing:.15em;margin-bottom:8px">EXAM COUNTDOWN</div>
              <div style="font-family:'Courier New',Courier,monospace;font-size:28px;font-weight:700;color:#e8a33d;line-height:1;margin-bottom:4px">${examDaysLeft}</div>
              <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;color:#9b7a30">days until your exam</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>` : '';

  const goalBadge = weeklyGoalMet ? `
    <tr>
      <td align="center" style="padding:12px 0 0 0">
        <table cellpadding="0" cellspacing="0" border="0" role="presentation" align="center">
          <tr>
            <td style="background:#0d2010;border:1px solid #1a4a24;border-radius:20px;padding:5px 16px">
              <span style="font-family:'Courier New',Courier,monospace;font-size:11px;color:#4ade80;letter-spacing:.05em">&#10003; Weekly goal met</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>` : '';

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="x-apple-disable-message-reformatting">
<title>Your Sequora Week</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;-webkit-text-size-adjust:100%;mso-line-height-rule:exactly">
<table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#0a0a0a">
  <tr>
    <td align="center" style="padding:32px 16px">

      <table width="600" cellpadding="0" cellspacing="0" border="0" role="presentation" style="max-width:600px;width:100%">

        <!-- HEADER -->
        <tr>
          <td style="background:#1a1815;border-top:1px solid #332d26;border-left:1px solid #332d26;border-right:1px solid #332d26;border-bottom:2px solid #e8a33d;border-radius:12px 12px 0 0;padding:24px 32px 22px">
            <div style="font-family:'Courier New',Courier,monospace;font-size:20px;font-weight:700;color:#e8a33d;letter-spacing:5px;mso-line-height-rule:exactly">SEQUORA</div>
            <div style="font-family:'Courier New',Courier,monospace;font-size:10px;color:#4a4540;letter-spacing:3px;margin-top:5px;mso-line-height-rule:exactly">WEEKLY REPORT</div>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#1a1815;border-left:1px solid #332d26;border-right:1px solid #332d26;padding:32px 32px 28px">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">

              <!-- Greeting -->
              <tr>
                <td style="padding:0 0 28px 0">
                  <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#f4ece0;font-weight:700;margin:0 0 5px 0">Hi ${name},</div>
                  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;color:#4a4540;letter-spacing:.02em">${dateRange}</div>
                </td>
              </tr>

              <!-- HERO -->
              <tr>
                <td style="padding:0 0 16px 0">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#111009;border:1px solid #2a2520;border-radius:10px">
                    <tr>
                      <td style="padding:32px 24px 28px;text-align:center">
                        <div style="font-family:'Courier New',Courier,monospace;font-size:10px;color:#4a4540;letter-spacing:.18em;margin-bottom:14px">HOURS STUDIED THIS WEEK</div>
                        <div style="font-family:'Courier New',Courier,monospace;font-size:72px;font-weight:700;color:${weeklyGoalMet ? '#e8a33d' : '#c8bfb0'};line-height:1;margin-bottom:10px">${hoursDisplay}</div>
                        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;color:#6b6359">hours</div>
                        ${goalBadge}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- STATS GRID 2x2 -->
              <tr>
                <td style="padding:0 0 20px 0">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                    <tr>
                      <td width="50%" style="padding:0 5px 5px 0;vertical-align:top">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#111009;border:1px solid #2a2520;border-radius:8px">
                          <tr><td style="padding:20px 16px;text-align:center">
                            <div style="font-family:'Courier New',Courier,monospace;font-size:32px;font-weight:700;color:#f0c277;line-height:1;margin-bottom:7px">${sessionsCount}</div>
                            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;color:#4a4540;letter-spacing:.04em">Study Sessions</div>
                          </td></tr>
                        </table>
                      </td>
                      <td width="50%" style="padding:0 0 5px 5px;vertical-align:top">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#111009;border:1px solid #2a2520;border-radius:8px">
                          <tr><td style="padding:20px 16px;text-align:center">
                            <div style="font-family:'Courier New',Courier,monospace;font-size:32px;font-weight:700;color:#f0c277;line-height:1;margin-bottom:7px">${topicsStudied}</div>
                            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;color:#4a4540;letter-spacing:.04em">Subjects Covered</div>
                          </td></tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td width="50%" style="padding:0 5px 0 0;vertical-align:top">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#111009;border:1px solid #2a2520;border-radius:8px">
                          <tr><td style="padding:20px 16px;text-align:center">
                            <div style="font-family:'Courier New',Courier,monospace;font-size:32px;font-weight:700;color:#f0c277;line-height:1;margin-bottom:7px">${streakDays}</div>
                            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;color:#4a4540;letter-spacing:.04em">Day Streak</div>
                          </td></tr>
                        </table>
                      </td>
                      <td width="50%" style="padding:0 0 0 5px;vertical-align:top">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background:#111009;border:1px solid ${recallsDue > 0 ? '#4a1a1a' : '#2a2520'};border-radius:8px">
                          <tr><td style="padding:20px 16px;text-align:center">
                            <div style="font-family:'Courier New',Courier,monospace;font-size:32px;font-weight:700;color:${recallsDue > 0 ? '#f87171' : '#f0c277'};line-height:1;margin-bottom:7px">${recallsDue}</div>
                            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;color:#4a4540;letter-spacing:.04em">Recalls Due</div>
                          </td></tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${topSubjectBlock}
              ${examBlock}

              <!-- Divider -->
              <tr>
                <td style="padding:8px 0 24px 0">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                    <tr><td style="height:1px;background:#2a2520;font-size:0;line-height:0">&nbsp;</td></tr>
                  </table>
                </td>
              </tr>

              <!-- Motivation -->
              <tr>
                <td style="padding:0 0 28px 0">
                  <div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#cdc4b5;line-height:1.65;font-style:italic">${motivation}</div>
                </td>
              </tr>

              <!-- CTA -->
              <tr>
                <td align="center" style="padding:0 0 4px 0">
                  <table cellpadding="0" cellspacing="0" border="0" role="presentation" align="center">
                    <tr>
                      <td align="center" bgcolor="#e8a33d" style="border-radius:8px">
                        <a href="https://sequora-studies.vercel.app/app" style="display:block;padding:14px 36px;color:#0a0a0a;font-family:'Courier New',Courier,monospace;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:.06em;border-radius:8px;mso-padding-alt:14px 36px">Open Sequora &#8594;</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#111009;border:1px solid #1e1c18;border-top:none;border-radius:0 0 12px 12px;padding:20px 32px">
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;color:#3a3530;line-height:1.7;text-align:center">
              You&#39;re receiving this because weekly reports are enabled for your account.<br>
              To unsubscribe: open Sequora &rarr; menu &rarr; Settings &rarr; Weekly email report.<br><br>
              Sequora Studies &middot; Bangladesh
            </div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return send({
    to: email,
    subject: `Your Sequora week — ${dateRange}`,
    html,
  });
}
