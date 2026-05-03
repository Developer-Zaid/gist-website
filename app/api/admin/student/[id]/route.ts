import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ FIXED TYPE
) {
  try {
    // ✅ IMPORTANT FIX
    const { id } = await params;

    const numericId = Number(id);

    if (!numericId) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    console.log('API HIT ID:', numericId);

    const result = await pool.query('SELECT * FROM admissions WHERE id = $1', [numericId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const student = result.rows[0];

    console.log('STUDENT DATA:', student);

    return NextResponse.json({ student });
  } catch (error: any) {
    console.log('DETAIL API ERROR:', error);

    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
