import { jwtDecode } from "jwt-decode";
import React from "react";
import { logout } from "../redux/store";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  interface DecodedToken {
    userId: string | number;
    role: string;
  }

  const token = localStorage.getItem("jwtA");
  let data: DecodedToken | null = null;
  if (token) {
    data = jwtDecode<DecodedToken>(token);
    // console.log("deconded form app", data);
  }
  // console.log(data == null ? "no user founded" : "user founded");

  // for logout
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwtA");
    navigate("/admin");
  };

  const location = useLocation()
  console.log(location)

  return (
    <>
      <div className="fixed flex z-10 bg-gray-900 justify-between p-5 w-full">
        <h1 className="text-primary font-bold text-3xl">Hello</h1>
        {/* <img src="" alt="" /> */}
        {data !== null && data.role === 'admin' && location.pathname === '/admin/users' ? <button
          className="bg-red-500 text-white rounded-xl px-3 pb-2 pt-1"
          onClick={handleLogout}
        >
          Logout
        </button> : <></>}
      </div>
    </>
  );
};

export default Navbar;
