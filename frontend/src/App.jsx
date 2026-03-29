
import { Routes,Route,Navigate } from 'react-router'
import { useUser } from '@clerk/clerk-react'
import HomePage from './pages/HomePage'
import Problems from './pages/Problems'


function App() {
  const { isSignedIn } = useUser();
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/problems" element={isSignedIn ? <Problems /> : <Navigate to="/" />} />
    </Routes>
      <Toaster/>
    </>
  )
}

export default App
