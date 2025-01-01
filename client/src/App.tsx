import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import SignUp from './pages/SignUp'
import AdminLogin from './pages/AdminLogin'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/admin/' element={<AdminLogin/>}/>
      </Routes>
    </>
  )
}

export default App
