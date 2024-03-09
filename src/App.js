import Chat from './pages/Chat';
import Login from './pages/Login'
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';


function App() {
  const { authUser } = useAuthContext()
  return (
      <BrowserRouter>

        <Routes>
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={authUser ? <Navigate to="/" /> : <Register />} />
          <Route path="/" element={authUser ? <Chat /> : <Navigate to="/login" />} />
        </Routes>
        <ToastContainer />
        
      </BrowserRouter>
  )


}
export default App;
