import { RootState } from "../../redux/store";
import React from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Home: React.FC = () => {
  
  const state = useTypedSelector((state) => state);
  console.log(state);

  return (
    <>
      <div className="px-10 py-32">
        <img src={`http://localhost:4004/${state.auth.user.profile}`} alt="" className="rounded-full" />
        <h1 className="text-white">Email: {state.auth.user?.email ?? "Not Logged In"}</h1>
      </div>
    </>
  );
};

export default Home;