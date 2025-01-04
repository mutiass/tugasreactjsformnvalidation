import React, { useState } from 'react';
import Validator from 'validatorjs';
import './FormandValidation.css';

const FormandValidation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    course: '',
    alamat: '',
    member: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rules = {
      name: 'required|string|max:50',
      email: 'required|email',
      password: 'required|min:6',
      gender: 'required',
      course: 'required',
      alamat: 'required|string|max:255',
      member: 'accepted',
    };

    const validation = new Validator(formData, rules);
    if (validation.fails()) {
      setErrors(validation.errors.all());
    } else {
      setErrors({});
      alert(
        `Nama: ${formData.name}\nEmail: ${formData.email}\nPassword: ${formData.password}\nGender: ${formData.gender}\nKursus: ${formData.course}\nAlamat: ${formData.alamat}\nMember: ${formData.member ? 'Yes' : 'No'}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Nama:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name[0]}</p>}
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email[0]}</p>}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password[0]}</p>}
      </div>

      <div className="form-group">
        <label>Gender:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Pria"
              checked={formData.gender === 'Pria'}
              onChange={handleChange}
            />
            Pria
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Wanita"
              checked={formData.gender === 'Wanita'}
              onChange={handleChange}
            />
            Wanita
          </label>
        </div>
        {errors.gender && <p className="error">{errors.gender[0]}</p>}
      </div>

      <div className="form-group">
        <label>Kursus:</label>
        <select name="course" value={formData.course} onChange={handleChange}>
          <option value="">Pilih Kursus</option>
          <option value="Data Science">Data Science</option>
          <option value="Web Development">Web Development</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Software Engineering">Software Engineering</option>
        </select>
        {errors.course && <p className="error">{errors.course[0]}</p>}
      </div>

      <div className="form-group">
        <label>Alamat:</label>
        <textarea
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
          rows="4"
        />
        {errors.alamat && <p className="error">{errors.alamat[0]}</p>}
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="member"
            checked={formData.member}
            onChange={handleChange}
          />
          Member
        </label>
        {errors.member && <p className="error">{errors.member[0]}</p>}
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default FormandValidation;