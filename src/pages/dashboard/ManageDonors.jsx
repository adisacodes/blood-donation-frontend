import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"


const ManageDonors = () => {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)


  useEffect(() => {
    fetch("https://blood-donation-backend-yqzf.onrender.com/api/admin/donors")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch donors")
        return res.json()
      })
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
    if (!window.confirm("Are you sure you want to delete this donor?")) return


    setDeletingId(id)


    fetch(`https://blood-donation-backend-yqzf.onrender.com/api/admin/donors/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete")
        setDonors(prevDonors => prevDonors.filter(donor => donor.id !== id))
      })
      .catch(err => {
        console.error("Delete failed:", err)
        alert("Could not delete donor. Please try again.")
      })
      .finally(() => {
        setDeletingId(null)
      })
  }


  if (loading) return <div className="p-6 text-gray-600">Loading donors... ⏳</div>


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-red-700 mb-6">Manage Donors 🩸</h1>


        {/* Mobile view */}
        <div className="block md:hidden">
          {donors.length > 0 ? donors.map(donor => (
            <div key={donor.id} className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-100">
              <p className="font-bold text-gray-800">Donor #{donor.id}</p>
              <p className="text-gray-600">Email: {donor.email}</p>
              <p className="text-gray-600">Blood Type: <span className="font-semibold text-red-600">{donor.blood_group}</span></p>
              <p className="text-gray-600">Phone: {donor.phone_number}</p>
              <button
                onClick={() => handleDelete(donor.id)}
                disabled={deletingId === donor.id}
                className="mt-3 bg-red-700 text-white px-3 py-2 rounded hover:bg-red-800 w-full disabled:bg-gray-400 transition-colors">
                {deletingId === donor.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          )) : <p className="text-gray-500 italic">No donors found</p>}
        </div>


        {/* Desktop view - FIXED with correct fields */}
        <div className="hidden md:block overflow-hidden rounded-lg shadow-md bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left font-semibold">ID</th>
                <th className="p-3 text-left font-semibold">Email</th>
                <th className="p-3 text-left font-semibold">Blood Type</th>
                <th className="p-3 text-left font-semibold">Phone</th>
                <th className="p-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.length > 0 ? donors.map(donor => (
                <tr key={donor.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-gray-700">{donor.id}</td>
                  <td className="p-3 text-gray-700">{donor.email}</td>
                  <td className="p-3 font-semibold text-red-600">{donor.blood_group}</td>
                  <td className="p-3 text-gray-600">{donor.phone_number}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(donor.id)}
                      disabled={deletingId === donor.id}
                      className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 disabled:bg-gray-400 transition-colors text-sm">
                      {deletingId === donor.id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500 italic">
                    No donors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


export default ManageDonors