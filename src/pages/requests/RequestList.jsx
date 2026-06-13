import { useEffect, useState } from "react";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Load requests from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bloodRequests")) || [];
    setRequests(data);
    setFilteredRequests(data);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = requests;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((req) =>
        req.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Blood group filter
    if (filterBloodGroup) {
      filtered = filtered.filter((req) => req.bloodGroup === filterBloodGroup);
    }

    // Urgency filter
    if (filterUrgency) {
      filtered = filtered.filter((req) => req.urgency === filterUrgency);
    }

    setFilteredRequests(filtered);
  }, [searchTerm, filterBloodGroup, filterUrgency, requests]);

  // Delete request
  const handleDelete = (id) => {
    const updatedRequests = requests.filter((req) => req.id !== id);
    setRequests(updatedRequests);
    localStorage.setItem("bloodRequests", JSON.stringify(updatedRequests));
    setShowDeleteConfirm(null);
  };

  // Start editing
  const handleEdit = (request) => {
    setEditingId(request.id);
    setEditFormData({ ...request });
  };

  // Save edited request
  const handleSaveEdit = () => {
    if (!editFormData.patientName.trim()) {
      alert("Patient name is required");
      return;
    }

    const updatedRequests = requests.map((req) =>
      req.id === editingId ? editFormData : req
    );

    setRequests(updatedRequests);
    localStorage.setItem("bloodRequests", JSON.stringify(updatedRequests));
    setEditingId(null);
    setEditFormData({});
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-300";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Fulfilled":
        return "bg-green-100 text-green-800 border-green-300";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Cancelled":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Blood Requests</h2>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Patient Name
              </label>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Blood Group Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Blood Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Urgency Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level
              </label>
              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Urgencies</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterBloodGroup("");
                  setFilterUrgency("");
                }}
                className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredRequests.length} of {requests.length} request
            {requests.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Requests Display */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="mt-4 text-lg text-gray-600">No blood requests found.</p>
            <p className="text-sm text-gray-500 mt-2">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {editingId === request.id ? (
                  // Edit Mode
                  <div className="p-6 bg-gray-50 border-l-4 border-red-500">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Edit Request
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Patient Name
                        </label>
                        <input
                          type="text"
                          name="patientName"
                          value={editFormData.patientName}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Blood Group
                        </label>
                        <select
                          name="bloodGroup"
                          value={editFormData.bloodGroup}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Hospital
                        </label>
                        <input
                          type="text"
                          name="hospital"
                          value={editFormData.hospital}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Units Needed
                        </label>
                        <input
                          type="number"
                          name="unitsNeeded"
                          value={editFormData.unitsNeeded}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          min="1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={editFormData.location}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          name="contactNumber"
                          value={editFormData.contactNumber}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Urgency Level
                        </label>
                        <select
                          name="urgency"
                          value={editFormData.urgency}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="">Select Urgency</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          name="status"
                          value={editFormData.status}
                          onChange={handleEditChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Fulfilled">Fulfilled</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        value={editFormData.notes}
                        onChange={handleEditChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="p-6 border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800">
                            {request.patientName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Hospital: {request.hospital}
                          </p>
                        </div>

                        <div className="flex gap-2 flex-wrap justify-end">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(
                              request.urgency
                            )}`}
                          >
                            {request.urgency}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-600 font-medium">
                            Blood Group
                          </p>
                          <p className="text-lg font-bold text-red-600">
                            {request.bloodGroup}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-600 font-medium">
                            Units Needed
                          </p>
                          <p className="text-lg font-bold text-gray-800">
                            {request.unitsNeeded}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-600 font-medium">
                            Contact
                          </p>
                          <p className="text-lg font-bold text-gray-800">
                            {request.contactNumber}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            <strong>Location:</strong> {request.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            <strong>Created:</strong>{" "}
                            {new Date(request.createdAt).toLocaleDateString()} at{" "}
                            {new Date(request.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>

                      {request.notes && (
                        <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
                          <p className="text-sm text-gray-700">
                            <strong>Notes:</strong> {request.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">
                      <button
                        onClick={() => handleEdit(request)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(request.id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                      >
                        Delete
                      </button>

                      {/* Delete Confirmation */}
                      {showDeleteConfirm === request.id && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="bg-white rounded-lg p-6 max-w-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                              Confirm Delete
                            </h3>
                            <p className="text-gray-600 mb-6">
                              Are you sure you want to delete this blood request
                              for {request.patientName}? This action cannot be
                              undone.
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleDelete(request.id)}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestList;