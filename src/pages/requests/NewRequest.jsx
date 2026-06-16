import React, { useState } from 'react';

// ✅ FIXED: Changed to hospital endpoint
const API_BASE_URL = "https://blood-donation-backend-yqzf.onrender.com/api/hospital/requests";

export default function NewRequest({ onRequestCreated }) {
  const [formData, setFormData] = useState({
    requested_by: '',
    blood_type: 'O+',
    units: 1,
    date: new Date().toISOString().split('T')[0]
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'units' ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const currentUser = JSON.parse(localStorage.getItem('user')) || {};

      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          requested_by: formData.requested_by
        })
      });

      if (!response.ok) throw new Error("Failed to create blood request");

      const newRequest = await response.json();
      setMessage({ type: 'success', text: 'Blood request submitted successfully!' });
      
      setFormData(prev => ({ ...prev, requested_by: '', units: 1 }));

      if (onRequestCreated) {
        onRequestCreated(newRequest);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '20px auto', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#F9F9F9' }}>
      <h3>Create New Blood Request</h3>
      
      {message && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', color: 'white', backgroundColor: message.type === 'success' ? '#137333' : '#c5221f' }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Requested By (Hospital / Person):</label>
          <input 
            type="text" 
            name="requested_by" 
            value={formData.requested_by} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Blood Type:</label>
          <select 
            name="blood_type" 
            value={formData.blood_type} 
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Units Required:</label>
          <input 
            type="number" 
            name="units" 
            min="1" 
            value={formData.units} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Required Date:</label>
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          style={{ width: '100%', padding: '10px', backgroundColor: '#FF0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {submitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}