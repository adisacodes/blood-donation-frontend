import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-red-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🩸 Blood Donation System</h1>
      <div className="flex gap-4">
        <a href="/donors" className="hover:underline">Donors</a>
        <a href="/requests" className="hover:underline">Requests</a>
        <a href="/login" className="hover:underline">Login</a>
      </div>
    </nav>
  )
}

export default Navbar