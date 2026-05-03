import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, name, email, course, mode, status, created_at
       FROM admissions
       ORDER BY id DESC`
    );

    return NextResponse.json({ students: result.rows });
  } catch (error) {
    console.log('FETCH STUDENTS ERROR:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
