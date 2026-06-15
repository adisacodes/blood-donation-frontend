import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ManageDonors from './ManageDonors'

describe('ManageDonors', () => {
  test('renders Manage Donors heading', () => {
    render(
      <BrowserRouter>
        <ManageDonors />
      </BrowserRouter>
    )
    expect(screen.getAllByText(/Manage Donors/i).length).toBeGreaterThan(0)
  })

  test('renders table headers', () => {
    render(
      <BrowserRouter>
        <ManageDonors />
      </BrowserRouter>
    )
    const nameElement = screen.getAllByText(/Name/i)
    const bloodTypeElement = screen.getAllByText(/Blood Type/i)
    const locationElement = screen.getAllByText(/Location/i)
    expect(nameElement.length).toBeGreaterThan(0)
    expect(bloodTypeElement.length).toBeGreaterThan(0)
    expect(locationElement.length).toBeGreaterThan(0)
  })

  test('renders delete button', () => {
    render(
      <BrowserRouter>
        <ManageDonors />
      </BrowserRouter>
    )
    const deleteButton = screen.getAllByText(/Delete/i)
    expect(deleteButton.length).toBeGreaterThan(0)
  })
})
