'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function StudentDetails() {
  const params = useParams();
  const id = params?.id;

  const router = useRouter();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // ✅ FIXED API PATH
        const res = await fetch(`/api/admin/student/${id}`);
        const data = await res.json();

        console.log('DETAIL DATA:', data);

        if (data.student) {
          setStudent(data.student);
        }
      } catch (err) {
        console.log('DETAIL ERROR:', err);
      }
    };

    fetchData();
  }, [id]);

  if (!student) {
    return <div className="text-white text-center mt-20">Loading student details...</div>;
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <button onClick={() => router.push('/admin')} className="mb-6 bg-gray-700 px-4 py-2 rounded">
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Student Details</h1>

      <div className="bg-white/10 p-6 rounded-xl space-y-3">
        <p>
          <b>Name:</b> {student.name}
        </p>

        <p>
          <b>Email:</b> {student.email}
        </p>

        <p>
          <b>Contact:</b> {student.contact}
        </p>

        <p>
          <b>Parent Contact:</b> {student.parentcontact}
        </p>

        <p>
          <b>CNIC:</b> {student.cnic}
        </p>

        <p>
          <b>Course:</b> {student.course}
        </p>

        <p>
          <b>Mode:</b> {student.mode}
        </p>

        <p>
          <b>Status:</b> {student.status}
        </p>

        <hr className="border-white/20" />

        <h2 className="text-xl font-semibold mt-6">Documents</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          <div>
            <p className="mb-2 text-sm">Photo</p>

            <img
              src={student.photo}
              className="w-full h-32 object-cover rounded-lg border cursor-pointer"
              onClick={() => window.open(student.photo, '_blank')}
            />
          </div>

          <div>
            <p className="mb-2 text-sm">Fee Slip</p>

            <img
              src={student.feeslip}
              className="w-full h-32 object-cover rounded-lg border cursor-pointer"
              onClick={() => window.open(student.feeslip, '_blank')}
            />
          </div>

          <div>
            <p className="mb-2 text-sm">Domicile</p>

            <img
              src={student.domicile}
              className="w-full h-32 object-cover rounded-lg border cursor-pointer"
              onClick={() => window.open(student.domicile, '_blank')}
            />
          </div>

          <div>
            <p className="mb-2 text-sm">Marksheet</p>

            <img
              src={student.marksheet}
              className="w-full h-32 object-cover rounded-lg border cursor-pointer"
              onClick={() => window.open(student.marksheet, '_blank')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
