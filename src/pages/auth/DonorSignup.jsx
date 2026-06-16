import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const DonorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    blood_group: '',
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

    // Client-side validation check
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }

    // Destructure to isolate confirmPassword out of the backend payload object
    const { confirmPassword, ...backendData } = formData;

    try {
      setLoading(true);
      
      // 1. Send signup payload to backend
      await authService.signup(backendData, 'donor');
      
      // 2. Automatically log them in right after signing up so they don't have to log in manually!
      await authService.login(formData.email, formData.password);
      
      // 3. SUCCESS REDIRECT: Fixed to match your exact dashboard setup route path! 🩸
      navigate('/donor-dashboard');
      
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-6">Donor Registration</h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 text-sm text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.first_name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.last_name}
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

          <select 
            name="blood_group"
            required
            className="w-full border p-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            value={formData.blood_group}
            onChange={handleChange}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-red-600 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DonorSignup;