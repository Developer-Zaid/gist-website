import pool from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // =========================
    // TEXT FIELDS
    // =========================
    const name = formData.get('name');
    const fatherName = formData.get('fatherName');
    const caste = formData.get('caste');
    const email = formData.get('email');
    const contact = formData.get('contact');
    const parentContact = formData.get('parentContact');
    const city = formData.get('city');
    const address = formData.get('address');
    const cnic = formData.get('cnic');
    const qualification = formData.get('qualification');
    const course = formData.get('course');
    const mode = formData.get('mode');
    const experience = formData.get('experience');
    const transactionId = formData.get('transactionId');

    // =========================
    // FILES
    // =========================
    const photo = formData.get('photo') as File;
    const feeSlip = formData.get('feeSlip') as File;
    const domicile = formData.get('domicile') as File;
    const marksheet = formData.get('marksheet') as File;
    const cnicImage = formData.get('cnicImage') as File;

    // =========================
    // FILE VALIDATION
    // =========================
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 2 * 1024 * 1024;

    const validateFile = (file: File, name: string) => {
      if (!file) throw new Error(`${name} is required`);
      if (!allowedTypes.includes(file.type)) throw new Error(`${name} must be JPG, PNG or PDF`);
      if (file.size > maxSize) throw new Error(`${name} must be less than 2MB`);
    };

    validateFile(photo, 'Photo');
    validateFile(feeSlip, 'Fee Slip');
    validateFile(domicile, 'Domicile');
    validateFile(marksheet, 'Marksheet');
    validateFile(cnicImage, 'CNIC Image');

    // =========================
    // SAVE FILE
    // =========================
    const saveFile = async (file: File) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = Date.now() + '_' + file.name;
      const filePath = path.join(process.cwd(), 'public/uploads', fileName);

      await writeFile(filePath, buffer);
      return fileName;
    };

    const photoName = await saveFile(photo);
    const feeSlipName = await saveFile(feeSlip);
    const domicileName = await saveFile(domicile);
    const marksheetName = await saveFile(marksheet);
    const cnicName = await saveFile(cnicImage);

    // =========================
    // DUPLICATE CHECK (FIXED)
    // =========================
    const check = await pool.query('SELECT * FROM admissions WHERE email = $1', [email]);

    if (check.rows.length > 0) {
      return Response.json({ error: 'You already applied' }, { status: 400 });
    }

    // =========================
    // INSERT INTO DB (FIXED)
    // =========================
    await pool.query(
      `INSERT INTO admissions
      (name, fatherName, caste, email, contact, parentContact, city, address,
       cnic, cnicImage, qualification, course, mode, experience,
       transactionId, feeSlip, photo, domicile, marksheet)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
      [
        name,
        fatherName,
        caste,
        email,
        contact,
        parentContact,
        city,
        address,
        cnic,
        cnicName,
        qualification,
        course,
        mode,
        experience,
        transactionId,
        feeSlipName,
        photoName,
        domicileName,
        marksheetName,
      ]
    );

    return Response.json({
      message: '🎉 Admission submitted successfully',
    });
  } catch (error: any) {
    console.log('UPLOAD ERROR:', error);
    return Response.json({ error: error.message || 'Failed to submit' }, { status: 500 });
  }
}
