import { useState } from "react";

const NewRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    hospital: "",
    location: "",
    units: "",
    urgency: "",
    notes: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("bloodRequests")) || [];

    const newRequest = {
      id: Date.now(),
      ...formData
    };

    localStorage.setItem(
      "bloodRequests",
      JSON.stringify([...existing, newRequest])
    );

    alert("Blood request submitted successfully!");

    setFormData({
      name: "",
      phone: "",
      bloodGroup: "",
      hospital: "",
      location: "",
      units: "",
      urgency: "",
      notes: ""
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Blood Request</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          name="hospital"
          placeholder="Hospital"
          value={formData.hospital}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          name="units"
          placeholder="Units Needed"
          value={formData.units}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <select
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          className="w-full p-2 border"
        >
          <option value="">Select Urgency</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <textarea
          name="notes"
          placeholder="Additional Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default NewRequest;