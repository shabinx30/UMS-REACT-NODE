import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/users/Login";
import SignUp from "./pages/users/SignUp";
import Home from "./pages/users/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import Users from "./pages/admin/Users";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/" element={<AdminLogin />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
