
import { Routes,Route,Navigate } from 'react-router'
import { useUser } from '@clerk/clerk-react'
import HomePage from './pages/HomePage'
import Problems from './pages/Problems'
import { Toaster } from 'react-hot-toast'
import DashboardPage from './pages/DashboardPage'

function App() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }
  return (
    <>
    <Routes>
      <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
    </Routes>
      <Toaster toastOptions={{duration:3000}}/>
    </>
  )
}

export default App
