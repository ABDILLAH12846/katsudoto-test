// components/EditForm.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const EditForm = ({ initialValues }) => {
  const [formData, setFormData] = useState(initialValues);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/mahasiswa/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.message) {
        console.log(result.message);
        // Redirect ke halaman setelah pembaruan berhasil
        router.push('/mahasiswa');
      } else {
        console.error('Gagal memperbarui data mahasiswa');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        NIM:
        <input type="text" name="nim" value={formData.nim} onChange={handleChange} />
      </label>
      <br />
      <label>
        Nama:
        <input type="text" name="nama" value={formData.nama} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditForm;
