import React, { ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface UserAuthProps {
  children: ReactNode;
}

const AdminAuth: React.FC<UserAuthProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
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
    console.log(data == null ? "no user founded" : "user founded");

    //   action
    if (data == null) {
      navigate("/admin");
    } else if (data.role != "admin") {
      navigate("/admin");
    }
  },[navigate]);

  return <>{children}</>;
};

export default AdminAuth;
