import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/users/Login";
import SignUp from "./pages/users/SignUp";
import Home from "./pages/users/Home";
import AdminLogin from "./pages/admin/AdminLogin";
import Users from "./pages/admin/Users";

//Protection
import UserAuth from "./components/UserAuth";
import UserVeriAuth from "./components/UserVeriAuth";
import AdminAuth from "./components/AdminAuth";
import AdminVeriAuth from "./components/AdminVeriAuth";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <UserVeriAuth>
              <Login />
            </UserVeriAuth>
          }
        />
        <Route
          path="/login"
          element={
            <UserVeriAuth>
              <Login />
            </UserVeriAuth>
          }
        />
        <Route
          path="/home"
          element={
            <UserAuth>
              <Home />
            </UserAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <UserVeriAuth>
              <SignUp />
            </UserVeriAuth>
          }
        />
        <Route
          path="/admin/"
          element={
            <AdminVeriAuth>
              <AdminLogin />
            </AdminVeriAuth>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminAuth>
              <Users />
            </AdminAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
