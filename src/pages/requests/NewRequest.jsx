import { useState } from "react";

const NewRequest = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    location: "",
    unitsNeeded: "",
    contactNumber: "",
    urgency: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Blood group is required";
    }
    if (!formData.hospital.trim()) {
      newErrors.hospital = "Hospital is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.unitsNeeded || formData.unitsNeeded <= 0) {
      newErrors.unitsNeeded = "Units needed must be greater than 0";
    }
    if (!formData.contactNumber.trim() || !/^\d{10}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }
    if (!formData.urgency) {
      newErrors.urgency = "Urgency level is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Get existing requests from localStorage
      const existingRequests = JSON.parse(localStorage.getItem("bloodRequests")) || [];

      // Create new request with unique ID and timestamp
      const newRequest = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        status: "Pending",
      };

      // Add new request to array
      const updatedRequests = [...existingRequests, newRequest];

      // Save to localStorage
      localStorage.setItem("bloodRequests", JSON.stringify(updatedRequests));

      console.log("Blood Request Submitted:", newRequest);

      // Show success message
      setSuccessMessage("Blood request submitted successfully!");

      // Reset form
      setFormData({
        patientName: "",
        bloodGroup: "",
        hospital: "",
        location: "",
        unitsNeeded: "",
        contactNumber: "",
        urgency: "",
        notes: "",
      });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrors({ submit: "Failed to submit request. Please try again." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-2 text-red-600">
        Blood Request Form
      </h1>
      <p className="text-center text-gray-600 mb-6">Submit a blood request and help save lives</p>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errors.submit && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Patient Name *</label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.patientName ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Enter patient name"
          />
          {errors.patientName && (
            <p className="text-red-600 text-sm mt-1">{errors.patientName}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Blood Group *</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.bloodGroup ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
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
          {errors.bloodGroup && (
            <p className="text-red-600 text-sm mt-1">{errors.bloodGroup}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Hospital *</label>
          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.hospital ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Enter hospital name"
          />
          {errors.hospital && (
            <p className="text-red-600 text-sm mt-1">{errors.hospital}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.location ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Enter hospital location"
          />
          {errors.location && (
            <p className="text-red-600 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Units Needed *</label>
          <input
            type="number"
            name="unitsNeeded"
            value={formData.unitsNeeded}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.unitsNeeded ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            min="1"
            placeholder="Enter units needed"
          />
          {errors.unitsNeeded && (
            <p className="text-red-600 text-sm mt-1">{errors.unitsNeeded}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Contact Number *</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.contactNumber ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
            placeholder="Enter 10-digit phone number"
            maxLength="10"
          />
          {errors.contactNumber && (
            <p className="text-red-600 text-sm mt-1">{errors.contactNumber}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Urgency Level *</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
              errors.urgency ? "border-red-500 bg-red-50" : "border-gray-300"
            }`}
          >
            <option value="">Select Urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          {errors.urgency && (
            <p className="text-red-600 text-sm mt-1">{errors.urgency}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Add any additional information..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors font-semibold"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default NewRequest;