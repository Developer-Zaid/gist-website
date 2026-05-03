'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Admission() {
  const router = useRouter();

  const [form, setForm] = useState<any>({});
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<any>({});

  // 🔒 Protect page
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newErrors: any = {};

    // PERSONAL
    if (!form.name) newErrors.name = 'Required';
    if (!form.fatherName) newErrors.fatherName = 'Required';
    if (!form.caste) newErrors.caste = 'Required';
    if (!form.email) newErrors.email = 'Required';
    if (!form.contact) newErrors.contact = 'Required';
    if (!form.parentContact) newErrors.parentContact = 'Required';
    if (!form.city) newErrors.city = 'Required';
    if (!form.address) newErrors.address = 'Required';

    // CNIC
    if (!form.cnic) newErrors.cnic = 'Required';
    if (!form.cnicImage) newErrors.cnicImage = 'Upload required';

    // ACADEMIC
    if (!form.qualification) newErrors.qualification = 'Required';

    // COURSE
    if (!form.course) newErrors.course = 'Required';
    if (!form.mode) newErrors.mode = 'Required';
    if (!form.experience) newErrors.experience = 'Required';

    // PAYMENT
    if (!form.transactionId) newErrors.transactionId = 'Required';
    if (!form.feeSlip) newErrors.feeSlip = 'Upload required';

    // DOCUMENTS
    if (!form.photo) newErrors.photo = 'Upload required';
    if (!form.domicile) newErrors.domicile = 'Upload required';
    if (!form.marksheet) newErrors.marksheet = 'Upload required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage('❌ Please fill all required fields correctly');
      return;
    }

    setErrors({});

    try {
      // 🔥 FIX STARTS HERE

      // 🔥 REAL FILE UPLOAD STARTS HERE

      const formData = new FormData();

      // append all fields (text + files)
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      const res = await fetch('/api/admission', {
        method: 'POST',
        body: formData, // ❗ NO headers here
      });
      const data = await res.json();

      if (data.message) {
        setMessage('🎉 Your application has been submitted successfully!');

        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);

        setForm({});
      } else {
        setMessage(data.error || '❌ Submission Failed');
      }
    } catch {
      setMessage('❌ Server error');
    }
  };

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white/10 p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Online <span className="text-red-400">Admission Form</span>
        </h1>

        <p className="text-sm text-gray-400 mb-6 text-center">
          Fields marked with <span className="text-red-400">*</span> are required
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PERSONAL */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-red-400">Personal Info</h2>

            <input
              name="name"
              placeholder="Full Name *"
              onChange={handleChange}
              className={`input ${errors.name && 'border-red-500'}`}
            />
            <input
              name="fatherName"
              placeholder="Father Name *"
              onChange={handleChange}
              className={`input ${errors.fatherName && 'border-red-500'}`}
            />
            <input
              name="caste"
              placeholder="Caste *"
              onChange={handleChange}
              className={`input ${errors.caste && 'border-red-500'}`}
            />
            <input
              name="email"
              placeholder="Email *"
              onChange={handleChange}
              className={`input ${errors.email && 'border-red-500'}`}
            />
            <input
              name="contact"
              placeholder="Contact Number *"
              onChange={handleChange}
              className={`input ${errors.contact && 'border-red-500'}`}
            />
            <input
              name="parentContact"
              placeholder="Parent Contact *"
              onChange={handleChange}
              className={`input ${errors.parentContact && 'border-red-500'}`}
            />
            <input
              name="city"
              placeholder="City *"
              onChange={handleChange}
              className={`input ${errors.city && 'border-red-500'}`}
            />
            <input
              name="address"
              placeholder="Address *"
              onChange={handleChange}
              className={`input ${errors.address && 'border-red-500'}`}
            />
          </div>

          {/* CNIC */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-red-400">Identity</h2>

            <input
              name="cnic"
              placeholder="CNIC / B-Form Number *"
              onChange={handleChange}
              className={`input ${errors.cnic && 'border-red-500'}`}
            />

            <label className="text-sm">Upload CNIC / B-Form *</label>
            <input type="file" name="cnicImage" onChange={handleFile} className="input" />
          </div>

          {/* ACADEMIC */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-red-400">Academic</h2>

            <input
              name="qualification"
              placeholder="Qualification *"
              onChange={handleChange}
              className={`input ${errors.qualification && 'border-red-500'}`}
            />
          </div>

          {/* COURSE */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-red-400">Course</h2>

            <select name="course" onChange={handleChange} className="input">
              <option value="">Select Course *</option>

              <optgroup label="Monthly Courses (2000 PKR/month)">
                <option value="DIT">DIT</option>
                <option value="CIT">CIT</option>
                <option value="MS Office">MS Office</option>
                <option value="English Typing">English Typing</option>
              </optgroup>

              <optgroup label="Short Courses (5000 PKR total)">
                <option value="Web Development">Web Development</option>
                <option value="AI">Artificial Intelligence</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
              </optgroup>
            </select>

            <select name="mode" onChange={handleChange} className="input">
              <option value="">Class Type *</option>
              <option value="physical">Physical</option>
              <option value="online">Online</option>
            </select>

            <select name="experience" onChange={handleChange} className="input">
              <option value="">Previous Knowledge? *</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* PAYMENT */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-red-400">Payment</h2>

            <div className="bg-white/10 p-4 rounded-lg text-sm mb-4">
              <p>💳 JazzCash: 03003113830</p>
              <p>👤 Name: Hafiz Qadir Bux</p>

              <p className="mt-2">🏦 Meezan Bank</p>
              <p>Account: 98320105550356</p>
              <p>Name: Glamour Institute</p>
            </div>

            <input
              name="transactionId"
              placeholder="Transaction ID *"
              onChange={handleChange}
              className="input"
            />

            <label>Upload Payment Screenshot *</label>
            <input
              type="file"
              name="feeSlip"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFile}
              className="input"
            />
            {form.feeSlip && <p className="text-green-400 text-sm">✔ {form.feeSlip.name}</p>}
          </div>

          {/* DOCUMENTS */}
          <div>
            <h2 className="text-red-400 font-semibold">Documents</h2>

            <label>Photo *</label>
            <input
              type="file"
              name="photo"
              accept=".jpg,.jpeg,.png"
              onChange={handleFile}
              className="input"
            />
            {form.photo && <p className="text-green-400 text-sm">✔ {form.photo.name}</p>}

            <label>Domicile *</label>
            <input
              type="file"
              name="domicile"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFile}
              className="input"
            />
            {form.domicile && <p className="text-green-400 text-sm">✔ {form.domicile.name}</p>}

            <label>Marksheet *</label>
            <input
              type="file"
              name="marksheet"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFile}
              className="input"
            />
            {form.marksheet && <p className="text-green-400 text-sm">✔ {form.marksheet.name}</p>}
          </div>

          <button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 py-3 rounded-lg font-semibold">
            Submit Application
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
      </div>
    </section>
  );
}
