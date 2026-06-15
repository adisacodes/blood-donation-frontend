import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"

const DonorList = () => {
  const [donors, setDonors] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/api/donors/")
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

  const filteredDonors = donors.filter(donor =>
  donor.blood_group?.toLowerCase().includes(search.toLowerCase())
)

  if (loading) return <div className="p-6">Loading... ⏳</div>

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-700 mb-4">🩸 Donors</h1>
        <input
          type="text"
          placeholder="Search by blood type e.g O+"
          className="border p-2 rounded w-full mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 border-l-4 border-red-700">
                <p className="font-bold text-lg">Donor #{donor.id}</p>
                <p className="text-gray-500">Blood Type: {donor.blood_group}</p>
                <p className="text-gray-500">Location: {donor.location}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No donors found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DonorList
