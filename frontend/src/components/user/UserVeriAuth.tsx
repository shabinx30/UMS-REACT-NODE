import React, { ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface UserAuthProps {
  children: ReactNode;
}

const UserVeriAuth: React.FC<UserAuthProps> = ({ children }) => {
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

    if (data && data.role == "user") {
      // console.log("redirecting to home");
      navigate("/profile");
    }
  }, [navigate]);

  // console.log("redirecting to login");
  return <>{children}</>;
};

export default UserVeriAuth;
