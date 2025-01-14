import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/user/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import Users from "./pages/admin/Users";

//Protection
import UserAuth from "./components/user/UserAuth";
import UserVeriAuth from "./components/user/UserVeriAuth";
import AdminAuth from "./components/admin/AdminAuth";
import AdminVeriAuth from "./components/admin/AdminVeriAuth";

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
          path="/profile"
          element={
            <UserAuth>
              <Profile />
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
