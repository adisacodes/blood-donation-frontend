import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewRequest from "./NewRequest";

describe("NewRequest component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows validation messages when required fields are empty", async () => {
    render(<NewRequest />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /submit request/i }));

    expect(screen.getByText(/Patient name is required/i)).toBeTruthy();
    expect(screen.getByText(/Blood group is required/i)).toBeTruthy();
    expect(screen.getByText(/Hospital is required/i)).toBeTruthy();
    expect(screen.getByText(/Location is required/i)).toBeTruthy();
    expect(screen.getByText(/Units needed must be greater than 0/i)).toBeTruthy();
    expect(screen.getByText(/Contact number must be 10 digits/i)).toBeTruthy();
    expect(screen.getByText(/Urgency level is required/i)).toBeTruthy();
    expect(localStorage.getItem("bloodRequests")).toBeNull();
  });

  it("submits a valid request and stores it in localStorage", async () => {
    render(<NewRequest />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/Enter patient name/i), "Jane Doe");
    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0], "A+");
    await user.type(screen.getByPlaceholderText(/Enter hospital name/i), "City Hospital");
    await user.type(screen.getByPlaceholderText(/Enter hospital location/i), "Downtown");
    await user.type(screen.getByPlaceholderText(/Enter units needed/i), "3");
    await user.type(screen.getByPlaceholderText(/Enter 10-digit phone number/i), "1234567890");
    await user.selectOptions(selects[1], "High");
    await user.type(screen.getByPlaceholderText(/Add any additional information/i), "Need blood for surgery");

    await user.click(screen.getByRole("button", { name: /submit request/i }));

    expect(screen.getByText(/Blood request submitted successfully!/i)).toBeTruthy();

    const storedRequests = JSON.parse(localStorage.getItem("bloodRequests") || "[]");
    expect(storedRequests).toHaveLength(1);
    expect(storedRequests[0].patientName).toBe("Jane Doe");
    expect(storedRequests[0].bloodGroup).toBe("A+");
    expect(storedRequests[0].urgency).toBe("High");
    expect(storedRequests[0].status).toBe("Pending");

    expect(screen.getByPlaceholderText(/Enter patient name/i).value).toBe("");
    expect(selects[0].value).toBe("");
    expect(screen.getByPlaceholderText(/Enter hospital name/i).value).toBe("");
    expect(screen.getByPlaceholderText(/Enter hospital location/i).value).toBe("");
    expect(screen.getByPlaceholderText(/Enter units needed/i).value).toBe("");
    expect(screen.getByPlaceholderText(/Enter 10-digit phone number/i).value).toBe("");
    expect(selects[1].value).toBe("");
  });
});
