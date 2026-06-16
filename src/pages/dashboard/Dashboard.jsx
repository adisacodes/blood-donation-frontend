import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"
import { authService } from "../../services/authService"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    
    const token = authService.getToken()

   
    fetch("https://blood-donation-backend-yqzf.onrender.com/api/admin/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        
        "Authorization": `Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        // Handle database casing layout variations seamlessly
        setStats({
          totalDonors: data.total_donors ?? data.totalDonors ?? 0,
          totalRequests: data.total_requests ?? data.totalRequests ?? 0,
          pendingRequests: data.pending_requests ?? data.pendingRequests ?? 0,
          approvedRequests: data.approved_requests ?? data.approvedRequests ?? 0,
        })
        setLoading(false)
      })
      .catch(err => {
        console.error("Dashboard Fetch Error:", err)
        setError("Failed to load dashboard statistics.")
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-6 ">Loading ... ⏳</div>

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-red-700 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4 border-l-4  border-red-700">
            <h2 className="text-gray-500">Total Donors</h2>
            <p className="text-3xl font-bold text-red-700">{stats.totalDonors}</p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-4 border-l-4  border-red-700">
            <h2 className="text-gray-500">Total Requests</h2>
            <p className="text-3xl font-bold text-red-700">{stats.totalRequests}</p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-4 border-l-4  border-yellow-500">
            <h2 className="text-gray-500">Pending Requests</h2>
            <p className="text-3xl font-bold text-yellow-500">{stats.pendingRequests}</p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-4 border-l-4  border-green-500">
            <h2 className="text-gray-500">Approved Requests</h2>
            <p className="text-3xl font-bold text-green-500">{stats.approvedRequests}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard