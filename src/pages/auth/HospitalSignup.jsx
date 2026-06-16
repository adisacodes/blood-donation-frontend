import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const HospitalSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hospital_name: '',
    license_number: '',
    contact_person: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side password validation
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    // Isolate confirmPassword from the actual database schema keys
    const { confirmPassword, ...backendData } = formData;

    try {
      setLoading(true);
      
      // 1. Send signup information to the backend endpoint
      await authService.signup(backendData, 'hospital');
      
      // 2. 🌟 FIXED FLOW: Removed authService.login() to prevent automatic entry.
      // Display a notification so they know it worked, then push to login screen.
      alert('Hospital profile registered successfully! Please log in to your portal.');
      
      // 3. SUCCESS REDIRECT: Send them to the manual sign in screen 
      navigate('/login');
      
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-6">Hospital Registration</h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 text-sm text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="hospital_name"
            placeholder="Hospital Name"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.hospital_name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="license_number"
            placeholder="License Number"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.license_number}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact_person"
            placeholder="Contact Person"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.contact_person}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone_number"
            placeholder="Phone Number"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.phone_number}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-3 rounded-lg font-medium transition ${
              loading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading ? 'Registering Hospital...' : 'Register Hospital'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="text-red-600 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HospitalSignup;