import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
  })

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-red-700 mb-6">Admin Dashboard 🩸</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-red-700">
            <h2 className="text-gray-500">Total Donors</h2>
            <p className="text-3xl font-bold text-red-700">{stats.totalDonors}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-red-700">
            <h2 className="text-gray-500">Total Requests</h2>
            <p className="text-3xl font-bold text-red-700">{stats.totalRequests}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-yellow-500">
            <h2 className="text-gray-500">Pending Requests</h2>
            <p className="text-3xl font-bold text-yellow-500">{stats.pendingRequests}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
            <h2 className="text-gray-500">Approved Requests</h2>
            <p className="text-3xl font-bold text-green-500">{stats.approvedRequests}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
