import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // ✅ VERIFY TOKEN
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // ✅ POSTGRES QUERY (FIXED)
    const result = await pool.query(
      `SELECT
        u.name,
        u.email,
        a.course,
        a.status
       FROM users u
       LEFT JOIN admissions a
         ON LOWER(u.email) = LOWER(a.email)
       WHERE LOWER(u.email) = $1
       ORDER BY a.id DESC
       LIMIT 1`,
      [decoded.email.toLowerCase()]
    );

    const rows = result.rows;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        name: rows[0].name,
        email: rows[0].email,
        course: rows[0].course || 'Not Applied Yet',
        status: rows[0].status || 'Not Submitted',
      },
    });
  } catch (err) {
    console.log('ME ERROR:', err);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
