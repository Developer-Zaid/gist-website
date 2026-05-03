import nodemailer from 'nodemailer';

// ✅ Reusable email transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gist.educational@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
});
