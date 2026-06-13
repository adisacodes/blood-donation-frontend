import Sidebar from "../../components/Sidebar"

const ManageDonors = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-red-700 mb-6">
          Manage Donors 🩸
        </h1>
        
        {/* Mobile view - cards */}
        <div className="block md:hidden">
          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <p className="font-bold">Sample Donor</p>
            <p className="text-gray-500">Email: donor@example.com</p>
            <p className="text-gray-500">Blood Type: O+</p>
            <p className="text-gray-500">Location: Nairobi</p>
            <button className="mt-2 bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 w-full">
              Delete
            </button>
          </div>
        </div>

        {/* Desktop view - table */}
        <div className="hidden md:block">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Blood Type</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Sample Donor</td>
                <td className="p-3">donar@example.com</td>
                <td className="p-3">O+</td>
                <td className="p-3">Nairobi</td>
                <td className="p-3">
                  <button className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800">
                    Delete
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

export default ManageDonors
