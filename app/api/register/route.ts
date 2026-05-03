import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ POSTGRES QUERY FIXED
    await pool.query(
      `INSERT INTO users (name, email, password, phone)
       VALUES ($1, $2, $3, $4)`,
      [name, email, hashedPassword, phone]
    );

    return Response.json({ message: 'User registered successfully' });
  } catch (err) {
    console.log('REGISTER ERROR:', err);
    return Response.json({ error: 'Registration failed' }, { status: 500 });
  }
}
