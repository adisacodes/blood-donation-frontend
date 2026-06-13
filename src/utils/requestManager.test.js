import { beforeEach, describe, expect, it } from "vitest";
import {
  addRequest,
  deleteRequest,
  getAllRequests,
  searchByPatientName,
  updateRequest,
  validateRequestForm,
  clearAllRequests,
} from "./requestManager";

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

describe("requestManager utility", () => {
  beforeEach(() => {
    global.localStorage = localStorageMock;
    localStorage.clear();
  });

  it("validates required request fields", () => {
    const errors = validateRequestForm({});

    expect(errors.patientName).toBe("Patient name is required");
    expect(errors.bloodGroup).toBe("Blood group is required");
    expect(errors.hospital).toBe("Hospital is required");
    expect(errors.location).toBe("Location is required");
    expect(errors.unitsNeeded).toBe("Units needed must be greater than 0");
    expect(errors.contactNumber).toBe("Contact number must be 10 digits");
    expect(errors.urgency).toBe("Urgency level is required");
  });

  it("adds and retrieves a new request", () => {
    const formData = {
      patientName: "Jane Doe",
      bloodGroup: "A+",
      hospital: "City Hospital",
      location: "Downtown",
      unitsNeeded: 3,
      contactNumber: "1234567890",
      urgency: "High",
      notes: "Need blood for surgery",
    };

    const createdRequest = addRequest(formData);
    const allRequests = getAllRequests();

    expect(allRequests).toHaveLength(1);
    expect(createdRequest.id).toBeTypeOf("number");
    expect(createdRequest.status).toBe("Pending");
    expect(createdRequest.createdAt).toBeTypeOf("string");
    expect(allRequests[0].patientName).toBe("Jane Doe");
  });

  it("updates an existing request by id", () => {
    const request = addRequest({
      patientName: "Sam Smith",
      bloodGroup: "O-",
      hospital: "General Hospital",
      location: "Uptown",
      unitsNeeded: 2,
      contactNumber: "0987654321",
      urgency: "Medium",
      notes: "Donation needed urgently",
    });

    const updated = updateRequest(request.id, {
      patientName: "Samuel Smith",
      unitsNeeded: 4,
    });

    expect(updated.patientName).toBe("Samuel Smith");
    expect(updated.unitsNeeded).toBe(4);
    expect(getAllRequests()[0].patientName).toBe("Samuel Smith");
  });

  it("deletes a request from localStorage", () => {
    const request = addRequest({
      patientName: "Aisha Khan",
      bloodGroup: "B+",
      hospital: "Eastside Clinic",
      location: "East District",
      unitsNeeded: 1,
      contactNumber: "1112223333",
      urgency: "Low",
      notes: "Regular follow-up",
    });

    expect(getAllRequests()).toHaveLength(1);
    deleteRequest(request.id);
    expect(getAllRequests()).toHaveLength(0);
  });

  it("searches requests by patient name", () => {
    addRequest({
      patientName: "Mary Johnson",
      bloodGroup: "AB+",
      hospital: "West Hospital",
      location: "West End",
      unitsNeeded: 2,
      contactNumber: "2223334444",
      urgency: "Critical",
      notes: "Needs urgent care",
    });
    addRequest({
      patientName: "Mark Thomas",
      bloodGroup: "O+",
      hospital: "Central Medical",
      location: "Central City",
      unitsNeeded: 5,
      contactNumber: "3334445555",
      urgency: "High",
      notes: "Trauma patient",
    });

    const results = searchByPatientName("mary");
    expect(results).toHaveLength(1);
    expect(results[0].patientName).toBe("Mary Johnson");
  });

  it("clears all stored requests", () => {
    addRequest({
      patientName: "Jamal Brown",
      bloodGroup: "AB-",
      hospital: "North Care",
      location: "Northside",
      unitsNeeded: 2,
      contactNumber: "4445556666",
      urgency: "High",
      notes: "Blood required for transplant",
    });

    expect(getAllRequests()).toHaveLength(1);
    clearAllRequests();
    expect(getAllRequests()).toHaveLength(0);
  });
});
