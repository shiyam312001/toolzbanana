import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

function getMailSettings() {
  const host = process.env.SMTP_HOST ?? process.env.MAIL_HOST;
  const port = Number(process.env.SMTP_PORT ?? process.env.MAIL_PORT ?? 587);
  const user =
    process.env.SMTP_USER ??
    process.env.SMTP_USERNAME ??
    process.env.MAIL_USERNAME ??
    '';
  const pass =
    process.env.SMTP_PASSWORD ??
    process.env.SMTP_PASS ??
    process.env.MAIL_PASSWORD ??
    '';
  const from = process.env.SMTP_FROM ?? process.env.MAIL_FROM ?? user;
  const to =
    process.env.CONTACT_TO_EMAIL ??
    process.env.SMTP_TO ??
    process.env.MAIL_TO ??
    from;
  const secure =
    process.env.SMTP_SECURE === 'true' ||
    process.env.SMTP_SECURE === '1' ||
    port === 465;
  return { host, port, user, pass, from, to, secure };
}

function clamp(str, max) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, max);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = clamp(body.name, 200);
  const email = clamp(body.email, 320);
  const subject = clamp(body.subject, 300);
  const message = clamp(body.message, 8000);

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  const { host, port, user, pass, from, to, secure } = getMailSettings();

  if (!host || !from || !to) {
    return NextResponse.json(
      { error: 'Mail is not configured. Set SMTP_HOST, SMTP_FROM, and CONTACT_TO_EMAIL.' },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message,
  ].join('\n');

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <hr />
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
  `;

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text,
      html,
    });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ error: 'Could not send message. Try again later.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
