import { useEffect, useState } from "react";

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bloodRequests")) || [];
    setRequests(data);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Blood Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No blood requests yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="p-4 border rounded shadow bg-white">
              <h3 className="font-bold text-lg">{req.name}</h3>

              <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
              <p><strong>Phone:</strong> {req.phone}</p>
              <p><strong>Hospital:</strong> {req.hospital}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Units Needed:</strong> {req.units}</p>
              <p><strong>Urgency:</strong> {req.urgency}</p>

              {req.notes && (
                <p><strong>Notes:</strong> {req.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestList;