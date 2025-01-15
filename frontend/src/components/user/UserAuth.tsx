import React, { ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface UserAuthProps {
  children: ReactNode;
}

const UserAuth: React.FC<UserAuthProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    interface DecodedToken {
      userId: string | number;
      role: string;
    }

    const token = localStorage.getItem("jwt");
    let data: DecodedToken | null = null;
    if (token) {
      data = jwtDecode<DecodedToken>(token);
      // console.log("deconded form app", data);
    }
    console.log(data == null ? "no user founded" : "user founded");

    //   action
    if (data == null) {
      navigate("/");
    } else if (data.role != "user") {
      navigate("/");
    }
  },[navigate]);

  return <>{children}</>;
};

export default UserAuth;
