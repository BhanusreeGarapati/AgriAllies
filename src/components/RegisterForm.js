// components/RegisterForm.js
import { useState } from 'react';
import { createUser } from '../pages/api/user';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    userType: 'farmer',
    address: '',
    landSize: '',
    fundsAvailable: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      window.location.reload();
      alert('User registered successfully!');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" required />
      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" required />
      <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" className="p-2 border rounded" required />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" className="p-2 border rounded" required />
      <select name="userType" value={formData.userType} onChange={handleChange} className="p-2 border rounded">
        <option value="farmer">Farmer</option>
        <option value="investor">Investor</option>
        <option value="ngo">Ngo</option>
      </select>
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="p-2 border rounded" required />
      {formData.userType === 'farmer' && (
        <input name="landSize" value={formData.landSize} onChange={handleChange} placeholder="Land Size" className="p-2 border rounded" />
      )}
      {(formData.userType === 'investor' || formData.userType === 'ngo') && (
        <input name="fundsAvailable" value={formData.fundsAvailable} onChange={handleChange} placeholder="Funds Available" className="p-2 border rounded" />
      )}
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Register</button>
    </form>
  );
};

export default RegisterForm;
