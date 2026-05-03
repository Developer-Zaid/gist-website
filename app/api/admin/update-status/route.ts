import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { id, status } = await req.json();

    // =========================
    // GET STUDENT (FIXED)
    // =========================
    const result = await pool.query('SELECT email, name FROM admissions WHERE id = $1', [id]);

    const rows = result.rows;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const student = rows[0];

    // =========================
    // UPDATE STATUS (FIXED)
    // =========================
    await pool.query('UPDATE admissions SET status = $1 WHERE id = $2', [status, id]);

    // =========================
    // EMAIL CONFIG (SECURE)
    // =========================
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gist.educational@gmail.com', // ✅ from env
        pass: 'yxws zmkq jcfm patg', // ✅ from env
      },
    });

    // =========================
    // EMAIL MESSAGE
    // =========================
    const message =
      status === 'Approved'
        ? `🎉 Congratulations ${student.name}, your application has been APPROVED! For more details visit our website.`
        : `❌ Sorry ${student.name}, your application has been REJECTED. For more details visit our website.`;

    await transporter.sendMail({
      from: `GIST Institute <${process.env.EMAIL_USER}>`,
      to: student.email,
      subject: 'Application Status - GIST',
      text: message,
    });

    return NextResponse.json({ message: 'Status updated + email sent' });
  } catch (error) {
    console.log('EMAIL ERROR:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
