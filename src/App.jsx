import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import DonorSignup from './pages/auth/DonorSignup'       // New split file
import HospitalSignup from './pages/auth/HospitalSignup' // New split file
import Profile from './pages/auth/Profile'
import RoleSelection from './pages/auth/RoleSelection'
import DonorList from './pages/donors/DonorList'
import DonorSearch from './pages/donors/DonorSearch'
import RequestList from './pages/requests/RequestList'
import NewRequest from './pages/requests/NewRequest'
import Dashboard from './pages/dashboard/Dashboard'
import ManageDonors from './pages/dashboard/ManageDonors'
import ManageRequests from './pages/dashboard/ManageRequests'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Authentication Routes */}
    <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<RoleSelection />} />
      <Route path="/signup/donor" element={<DonorSignup />} />
      <Route path="/signup/hospital" element={<HospitalSignup />} />

        {/* Secure Guarded Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/donors" element={<DonorList />} />
          <Route path="/donors/search" element={<DonorSearch />} />
          <Route path="/requests" element={<RequestList />} />
          <Route path="/requests/new" element={<NewRequest />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/donors" element={<ManageDonors />} />
          <Route path="/dashboard/requests" element={<ManageRequests />} />
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App