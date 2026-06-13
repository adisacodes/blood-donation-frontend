import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ManageRequests from './ManageRequests'

describe('ManageRequests', () => {
  test('renders Manage Requests heading', () => {
    render(
      <BrowserRouter>
        <ManageRequests />
      </BrowserRouter>
    )
    const headings = screen.getAllByText(/Manage Requests/i)
    expect(headings.length).toBeGreaterThan(0)
  })

  test('renders table headers', () => {
    render(
      <BrowserRouter>
        <ManageRequests />
      </BrowserRouter>
    )
    const hospitalElements = screen.getAllByText(/Hospital/i)
    const bloodTypeElements = screen.getAllByText(/Blood Type/i)
    const statusElements = screen.getAllByText(/Status/i)
    expect(hospitalElements.length).toBeGreaterThan(0)
    expect(bloodTypeElements.length).toBeGreaterThan(0)
    expect(statusElements.length).toBeGreaterThan(0)
  })

  test('renders Approve and Reject buttons', () => {
    render(
      <BrowserRouter>
        <ManageRequests />
      </BrowserRouter>
    )
    const approveButtons = screen.getAllByText(/Approve/i)
    const rejectButtons = screen.getAllByText(/Reject/i)
    expect(approveButtons.length).toBeGreaterThan(0)
    expect(rejectButtons.length).toBeGreaterThan(0)
  })
})
