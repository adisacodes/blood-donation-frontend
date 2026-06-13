 import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  test('renders Admin Dashboard heading', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument()
  })

  test('renders Total Donors stat', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    expect(screen.getByText(/Total Donors/i)).toBeInTheDocument()
  })

  test('renders Total Requests stat', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    expect(screen.getByText(/Total Requests/i)).toBeInTheDocument()
  })
})
