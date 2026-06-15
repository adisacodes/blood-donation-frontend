import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"

const ManageRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/api/admin/requests")
      .then(res => res.json())
      .then(data => {
        setRequests(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error:", err)
        setLoading(false)
      })
  }, [])

  const handleStatus = (id, status) => {
    fetch(`http://localhost:8000/api/admin/requests/${id}?status=${status}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(() => {
        setRequests(requests.map(req =>
          req.id === id ? { ...req, status } : req
        ))
      })
  }

  if (loading) return <div className="p-6">Loading... ⏳</div>

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-red-700 mb-6">
          Manage Requests 🩸
        </h1>

        {/* Mobile view */}
        <div className="block md:hidden">
          {requests.length > 0 ? requests.map(req => (
            <div key={req.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <p className="font-bold">{req.requested_by}</p>
              <p className="text-gray-500">Blood Type: {req.blood_type}</p>
              <p className="text-gray-500">Units: {req.units}</p>
              <p className={`font-bold ${req.status === 'pending' ? 'text-yellow-500' : req.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                Status: {req.status}
              </p>
              <div className="flex gap-2 mt-2">
                {req.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatus(req.id, 'approved')}
                      className="bg-green-600 text-white px-3 py-1 rounded w-full">
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatus(req.id, 'rejected')}
                      className="bg-red-700 text-white px-3 py-1 rounded w-full">
                      Reject
                    </button>
                  </>
                )}
                {req.status !== 'pending' && (
                  <p className="text-gray-400 text-sm">No actions available</p>
                )}
              </div>
            </div>
          )) : <p className="text-gray-500">No requests found</p>}
        </div>

        {/* Desktop view - WITH Approve/Reject Buttons */}
        <div className="hidden md:block">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Hospital / Source</th>
                <th className="p-3 text-left">Blood Type</th>
                <th className="p-3 text-left">Units</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? requests.map(req => (
                <tr key={req.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{req.id}</td>
                  <td className="p-3 font-medium text-gray-900">
                    {req.requested_by || "Unknown Hospital"}
                  </td>
                  <td className="p-3 text-red-600 font-bold">{req.blood_type}</td>
                  <td className="p-3">{req.units}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded font-semibold ${
                      req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      req.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500 text-sm">{req.date}</td>
                  <td className="p-3">
                    {req.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatus(req.id, 'approved')}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatus(req.id, 'rejected')}
                          className="bg-red-700 text-white px-3 py-1 rounded text-sm">
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No actions</span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500 italic">No requests found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageRequests