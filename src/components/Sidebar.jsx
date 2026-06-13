const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
      <ul className="flex flex-col gap-2">
        <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
        <li><a href="/dashboard/donors" className="hover:underline">Manage Donors</a></li>
        <li><a href="/dashboard/requests" className="hover:underline">Manage Requests</a></li>
      </ul>
    </div>
  )
}

export default Sidebar
