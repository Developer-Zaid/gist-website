import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    // =========================
    // FIND USER BY TOKEN
    // =========================
    const result = await pool.query('SELECT * FROM users WHERE resetToken = $1', [token]);

    const rows = result.rows;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const user = rows[0];

    // =========================
    // CHECK EXPIRY
    // =========================
    if (user.resettokenexpiry && new Date(user.resettokenexpiry) < new Date()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 400 });
    }

    // =========================
    // HASH NEW PASSWORD
    // =========================
    const hashed = await bcrypt.hash(password, 10);

    // =========================
    // UPDATE PASSWORD
    // =========================
    await pool.query(
      `UPDATE users
       SET password = $1, resetToken = NULL, resetTokenExpiry = NULL
       WHERE id = $2`,
      [hashed, user.id]
    );

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.log('RESET PASSWORD ERROR:', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
