/**
 * Request Manager Utility
 * Centralized functions for managing blood requests in localStorage
 */

// Get all blood requests from localStorage
export const getAllRequests = () => {
  try {
    const requests = localStorage.getItem("bloodRequests");
    return requests ? JSON.parse(requests) : [];
  } catch (error) {
    console.error("Error retrieving requests:", error);
    return [];
  }
};

// Add a new blood request
export const addRequest = (formData) => {
  try {
    const existingRequests = getAllRequests();
    const newRequest = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    const updatedRequests = [...existingRequests, newRequest];
    localStorage.setItem("bloodRequests", JSON.stringify(updatedRequests));
    return newRequest;
  } catch (error) {
    console.error("Error adding request:", error);
    throw error;
  }
};

// Update an existing blood request
export const updateRequest = (id, updatedData) => {
  try {
    const requests = getAllRequests();
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, ...updatedData } : req
    );

    localStorage.setItem("bloodRequests", JSON.stringify(updatedRequests));
    return updatedRequests.find((req) => req.id === id);
  } catch (error) {
    console.error("Error updating request:", error);
    throw error;
  }
};

// Delete a blood request
export const deleteRequest = (id) => {
  try {
    const requests = getAllRequests();
    const updatedRequests = requests.filter((req) => req.id !== id);
    localStorage.setItem("bloodRequests", JSON.stringify(updatedRequests));
    return true;
  } catch (error) {
    console.error("Error deleting request:", error);
    throw error;
  }
};

// Get request by ID
export const getRequestById = (id) => {
  try {
    const requests = getAllRequests();
    return requests.find((req) => req.id === id);
  } catch (error) {
    console.error("Error retrieving request:", error);
    return null;
  }
};

// Filter requests by blood group
export const filterByBloodGroup = (bloodGroup) => {
  const requests = getAllRequests();
  return requests.filter((req) => req.bloodGroup === bloodGroup);
};

// Filter requests by urgency
export const filterByUrgency = (urgency) => {
  const requests = getAllRequests();
  return requests.filter((req) => req.urgency === urgency);
};

// Filter requests by status
export const filterByStatus = (status) => {
  const requests = getAllRequests();
  return requests.filter((req) => req.status === status);
};

// Search requests by patient name
export const searchByPatientName = (searchTerm) => {
  const requests = getAllRequests();
  return requests.filter((req) =>
    req.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Get requests statistics
export const getRequestStats = () => {
  const requests = getAllRequests();
  return {
    total: requests.length,
    pending: requests.filter((req) => req.status === "Pending").length,
    fulfilled: requests.filter((req) => req.status === "Fulfilled").length,
    cancelled: requests.filter((req) => req.status === "Cancelled").length,
    critical: requests.filter((req) => req.urgency === "Critical").length,
  };
};

// Get requests for a specific blood group
export const getRequestsForBloodGroup = (bloodGroup) => {
  const requests = getAllRequests();
  return requests.filter(
    (req) =>
      req.bloodGroup === bloodGroup && req.status === "Pending"
  );
};

// Validate form data
export const validateRequestForm = (formData) => {
  const errors = {};

  if (!formData.patientName?.trim()) {
    errors.patientName = "Patient name is required";
  }
  if (!formData.bloodGroup) {
    errors.bloodGroup = "Blood group is required";
  }
  if (!formData.hospital?.trim()) {
    errors.hospital = "Hospital is required";
  }
  if (!formData.location?.trim()) {
    errors.location = "Location is required";
  }
  if (!formData.unitsNeeded || formData.unitsNeeded <= 0) {
    errors.unitsNeeded = "Units needed must be greater than 0";
  }
  if (
    !formData.contactNumber?.trim() ||
    !/^\d{10}$/.test(formData.contactNumber.trim())
  ) {
    errors.contactNumber = "Contact number must be 10 digits";
  }
  if (!formData.urgency) {
    errors.urgency = "Urgency level is required";
  }

  return errors;
};

// Clear all requests (use with caution)
export const clearAllRequests = () => {
  try {
    localStorage.removeItem("bloodRequests");
    return true;
  } catch (error) {
    console.error("Error clearing requests:", error);
    throw error;
  }
};

// Export requests as JSON
export const exportRequestsAsJSON = () => {
  const requests = getAllRequests();
  return JSON.stringify(requests, null, 2);
};
