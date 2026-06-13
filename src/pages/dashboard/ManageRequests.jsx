import Sidebar from "../../components/Sidebar"

const ManageRequests = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-red-700 mb-6">
          Manage Requests 🩸
        </h1>

        {/* Mobile view - cards */}
        <div className="block md:hidden">
          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <p className="font-bold">Nairobi Hospital</p>
            <p className="text-gray-500">Blood Type: A+</p>
            <p className="text-gray-500">Units: 2</p>
            <p className="text-yellow-500 font-bold">Status: Pending</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full">
                Approve
              </button>
              <button className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 w-full">
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* Desktop view - table */}
        <div className="hidden md:block">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left">Hospital</th>
                <th className="p-3 text-left">Blood Type</th>
                <th className="p-3 text-left">Units</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Nairobi Hospital</td>
                <td className="p-3">A+</td>
                <td className="p-3">2</td>
                <td className="p-3">2024-06-15</td>
                <td className="p-3">
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                    Pending
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Approve
                  </button>
                  <button className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800">
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageRequests
