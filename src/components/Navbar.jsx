import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-red-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🩸 Blood Donation System</h1>
      <div className="flex gap-4">
        <Link to="/donors" className="hover:underline">
          Donors
        </Link>
        <Link to="/requests" className="hover:underline">
          Requests
        </Link>
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
      </div>
    </nav>
  )
}

export default Navbar