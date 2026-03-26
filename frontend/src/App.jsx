
import { Routes,Route,Navigate } from 'react-router'
import { useUser } from '@clerk/clerk-react'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Problems from './pages/Problems'


function App() {
  const { isSignedIn } = useUser();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/problems" element={isSignedIn ? <Problems /> : <Navigate to="/" />} />
      
    </Routes>
  )
}

export default App
