import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get('type'); // all / approved

    let query = `SELECT name, email, contact, course, mode, status FROM admissions`;

    if (type === 'approved') {
      query += ` WHERE status = 'Approved'`;
    }

    // ✅ FIXED (PostgreSQL)
    const result = await pool.query(query);
    const rows = result.rows;

    // 🔥 Convert to CSV
    const headers = ['Name', 'Email', 'Contact', 'Course', 'Mode', 'Status'];

    const csvRows = [
      headers.join(','),
      ...rows.map((r: any) => [r.name, r.email, r.contact, r.course, r.mode, r.status].join(',')),
    ];

    const csv = csvRows.join('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=${type || 'all'}_students.csv`,
      },
    });
  } catch (error) {
    console.log('EXPORT ERROR:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
