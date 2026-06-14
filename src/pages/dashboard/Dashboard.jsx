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

   
    fetch("http://localhost:8000/api/admin/dashboard", {
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

  if (loading) return <div className="p-6 text-center font-medium">Loading dashboard telemetry... ⏳</div>

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Workspace</h1>
        <p className="text-sm text-gray-500 mb-8">Blood Donation Management System Control Panel</p>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-sm text-red-700 rounded-r-lg shadow-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 border-l-4 border-red-600 dynamic-card">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Donors</h2>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">{stats.totalDonors}</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 border-l-4 border-blue-600 dynamic-card">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Requests</h2>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">{stats.totalRequests}</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 border-l-4 border-amber-500 dynamic-card">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Requests</h2>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">{stats.pendingRequests}</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 border-l-4 border-emerald-500 dynamic-card">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Approved Requests</h2>
            <p className="text-4xl font-extrabold text-gray-900 mt-2">{stats.approvedRequests}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard