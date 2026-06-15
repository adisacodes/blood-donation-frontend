import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
      <ul className="flex flex-col gap-2">
        <li><Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link></li>
        <li><Link to="/dashboard/donors" className="hover:underline">
          Manage Donors
        </Link></li>
        <li><Link to="/dashboard/requests" className="hover:underline">
          Manage Requests
        </Link></li>
      </ul>
    </div>
  )
}

export default Sidebar
