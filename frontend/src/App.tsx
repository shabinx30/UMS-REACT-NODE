import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/users/Login";
import SignUp from "./pages/users/SignUp";
import Home from "./pages/users/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import Users from "./pages/admin/Users";
import { jwtDecode } from "jwt-decode";

function App() {
  interface DecodedToken {
    userId: string | number;
    role: string;
  }
  const token = localStorage.getItem("jwt");
  let data: DecodedToken | null = null;
  if (token) {
    data = jwtDecode<DecodedToken>(token);
    console.log('deconded form app', data)
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            data === null ? (
              <Navigate to={"/"} />
            ) : data.role === "user" ? (
              <Home />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/" element={<AdminLogin />} />
        <Route
          path="/admin/users"
          element={
            data === null || data.role !== "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Users />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
