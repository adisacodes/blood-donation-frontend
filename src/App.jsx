import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Profile from './pages/auth/Profile'
import DonorList from './pages/donors/DonorList'
import DonorSearch from './pages/donors/DonorSearch'
import RequestList from './pages/requests/RequestList'
import NewRequest from './pages/requests/NewRequest'
import Dashboard from './pages/dashboard/Dashboard'
import ManageDonors from './pages/dashboard/ManageDonors'
import ManageRequests from './pages/dashboard/ManageRequests'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/donors" element={<DonorList />} />
        <Route path="/donors/search" element={<DonorSearch />} />
        <Route path="/requests" element={<RequestList />} />
        <Route path="/requests/new" element={<NewRequest />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/donors" element={<ManageDonors />} />
        <Route path="/dashboard/requests" element={<ManageRequests />} />
      </Routes>
    </BrowserRouter>
  )
}




export default App