import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { transporter } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // =========================
    // CHECK USER
    // =========================
    const result = await pool.query('SELECT id, email FROM users WHERE email = $1', [email]);

    const rows = result.rows;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = rows[0];

    // =========================
    // GENERATE TOKEN
    // =========================
    const token = crypto.randomBytes(32).toString('hex');

    const expiry = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

    // =========================
    // SAVE TOKEN IN DB
    // =========================
    await pool.query('UPDATE users SET resetToken = $1, resetTokenExpiry = $2 WHERE id = $3', [
      token,
      expiry,
      user.id,
    ]);

    // =========================
    // RESET LINK
    // =========================
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // =========================
    // SEND EMAIL
    // =========================
    await transporter.sendMail({
      from: 'GIST Institute <gist.educational@gmail.com>',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}" style="color:blue">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    return NextResponse.json({ message: 'Reset link sent' });
  } catch (error: any) {
    console.log('FORGOT PASSWORD ERROR:', error);

    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
