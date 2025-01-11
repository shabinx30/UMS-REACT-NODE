import React, { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface UserAuthProps {
  children: ReactNode;
}

const AdminAuth: React.FC<UserAuthProps> = ({ children }) => {

  interface DecodedToken {
    userId: string | number;
    role: string;
  }
  
  const token = localStorage.getItem("jwt");
  let data: DecodedToken | null = null;
  if (token) {
    data = jwtDecode<DecodedToken>(token);
    console.log("deconded form app", data);
  }
  console.log(data == null ? "no user founded" : "user founded");

  //   action
  const navigate = useNavigate()
  if(data == null) {
    navigate('/admin')
  }else if(data.role != 'admin'){
    navigate('/admin')
  }

  return children
};

export default AdminAuth;
