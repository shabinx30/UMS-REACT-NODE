import { logout, RootState } from "../../redux/store";
import React from "react";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Home: React.FC = () => {
  
  const state = useTypedSelector((state) => state);
  console.log(state);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <>
      <div className="px-10 py-32">
        <img src={`http://localhost:4004/${state?.auth?.user?.profile}`} alt={state?.auth?.user?.name} className="rounded-full" />
        <h1 className="text-white">Name: {state?.auth?.user?.name ?? "Not Logged In"}</h1>
        <h1 className="text-white">Email: {state?.auth?.user?.email ?? "Not Logged In"}</h1>
        <button className="bg-red-600 text-white rounded-md p-2" onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default Home;