import React, { useState, useEffect } from 'react';
import NewRequest from './NewRequest';

const API_BASE_URL = "http://localhost:8000/api/admin/requests";

export default function RequestList() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNewRequest, setShowNewRequest] = useState(false);

    // Fetch all blood requests on component mount
    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}`);
            if (!response.ok) throw new Error("Failed to fetch requests");
            const data = await response.json();
            setRequests(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Status Updates (Approve / Reject) - Only for admin
    const handleStatusUpdate = async (id, action) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}/${action}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Failed to ${action} request`);
            }

            const updatedRequest = await response.json();
            
            setRequests(prevRequests => 
                prevRequests.map(req => req.id === id ? updatedRequest : req)
            );
        } catch (err) {
            alert(err.message);
        }
    };

    // Callback when new request is created
    const handleRequestCreated = (newRequest) => {
        setRequests(prev => [newRequest, ...prev]);
        setShowNewRequest(false);
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading requests...</div>;
    if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

    // Check if user is hospital (not admin)
    const userRole = localStorage.getItem('role');
    const isHospital = userRole === 'hospital';

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>
                {isHospital ? 'My Blood Requests' : 'Blood Requests Dashboard'}
            </h2>

            {/* ✅ ADD "Create New Request" Button for Hospitals */}
            {isHospital && (
                <button
                    onClick={() => setShowNewRequest(true)}
                    style={{
                        marginBottom: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#0056b3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Create New Blood Request
                </button>
            )}

            {/* ✅ Show NewRequest Form if clicked */}
            {showNewRequest && isHospital && (
                <div style={{ marginBottom: '30px' }}>
                    <NewRequest onRequestCreated={handleRequestCreated} />
                    <button
                        onClick={() => setShowNewRequest(false)}
                        style={{
                            marginTop: '15px',
                            padding: '8px 16px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}

            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
                            <th style={{ padding: '10px' }}>Requested By</th>
                            <th style={{ padding: '10px' }}>Blood Type</th>
                            <th style={{ padding: '10px' }}>Units</th>
                            <th style={{ padding: '10px' }}>Date</th>
                            <th style={{ padding: '10px' }}>Status</th>
                            {!isHospital && <th style={{ padding: '10px' }}>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>{req.requested_by}</td>
                                <td style={{ padding: '10px' }}><strong>{req.blood_type}</strong></td>
                                <td style={{ padding: '10px' }}>{req.units}</td>
                                <td style={{ padding: '10px' }}>{req.date}</td>
                                <td style={{ padding: '10px' }}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.85em',
                                        fontWeight: 'bold',
                                        backgroundColor: req.status === 'approved' ? '#e6f4ea' : req.status === 'rejected' ? '#fce8e6' : '#fef7e0',
                                        color: req.status === 'approved' ? '#137333' : req.status === 'rejected' ? '#c5221f' : '#b06000'
                                    }}>
                                        {req.status.toUpperCase()}
                                    </span>
                                </td>
                                {!isHospital && (
                                    <td style={{ padding: '10px' }}>
                                        {req.status === 'pending' ? (
                                            <>
                                                <button 
                                                    onClick={() => handleStatusUpdate(req.id, 'approve')}
                                                    style={{ marginRight: '8px', backgroundColor: '#137333', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusUpdate(req.id, 'reject')}
                                                    style={{ backgroundColor: '#c5221f', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span style={{ color: '#888', fontSize: '0.9em' }}>No actions available</span>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}