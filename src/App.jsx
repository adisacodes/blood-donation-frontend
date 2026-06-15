import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import DonorSignup from './pages/auth/DonorSignup'
import HospitalSignup from './pages/auth/HospitalSignup'
import Profile from './pages/auth/Profile'
import RoleSelection from './pages/auth/RoleSelection'
import DonorList from './pages/donors/DonorList'
import DonorSearch from './pages/donors/DonorList'
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

        {/* Admin Only Routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/donors" element={<ManageDonors />} />
          <Route path="/dashboard/requests" element={<ManageRequests />} />
        </Route>

        {/* Hospital Only Routes */}
        <Route element={<ProtectedRoute requiredRole="hospital" />}>
          <Route path="/requests" element={<RequestList />} />
          <Route path="/requests/new" element={<NewRequest />} />
        </Route>

        {/* Donor Only Routes */}
        <Route element={<ProtectedRoute requiredRole="donor" />}>
          <Route path="/donors" element={<DonorList />} />
          <Route path="/donors/search" element={<DonorSearch />} />
        </Route>

        {/* Routes for all authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
