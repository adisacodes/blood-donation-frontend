import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"

const ManageDonors = () => {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/admin/donors")
      .then(res => res.json())
      .then(data => {
        setDonors(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error:", err)
        setLoading(false)
      })
  }, [])

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/admin/donors/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        setDonors(donors.filter(donor => donor.id !== id))
      })
  }

  if (loading) return <div className="p-6">Loading... ⏳</div>

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-red-700 mb-6">Manage Donors 🩸</h1>

        {/* Mobile view */}
        <div className="block md:hidden">
          {donors.length > 0 ? donors.map(donor => (
            <div key={donor.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <p className="font-bold">Donor #{donor.id}</p>
              <p className="text-gray-500">Email: {donor.email}</p>
              <p className="text-gray-500">Blood Type: {donor.blood_type}</p>
              <p className="text-gray-500">Location: {donor.location}</p>
              <button
                onClick={() => handleDelete(donor.id)}
                className="mt-2 bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 w-full">
                Delete
              </button>
            </div>
          )) : <p className="text-gray-500">No donors found</p>}
        </div>

        {/* Desktop view */}
        <div className="hidden md:block">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Blood Type</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.length > 0 ? donors.map(donor => (
                <tr key={donor.id} className="border-b">
                  <td className="p-3">{donor.id}</td>
                  <td className="p-3">{donor.blood_type}</td>
                  <td className="p-3">{donor.location}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(donor.id)}
                      className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              )) : <tr><td colSpan="4" className="p-3 text-gray-500">No donors found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageDonors
