import { logout, RootState } from "../../redux/store";
import React from "react";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Profile: React.FC = () => {
  const state = useTypedSelector((state) => state);
  console.log(state);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 pt-14 md:pt-0">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex justify-center ">
              <div className="block">
                <div className="flex justify-center items-center pb-5">
                  <img
                    src={`http://localhost:4004/${state?.auth?.user?.profile}`}
                    alt={state?.auth?.user?.name}
                    className="rounded-full border-4 border-red-50"
                  />
                </div>
                <h1 className="text-white flex justify-center items-center">
                  <span className="font-medium">Name:</span> <span className="text-primary">{state?.auth?.user?.name ?? "Not Logged In"}</span>
                </h1>
                <h1 className="text-white">
                  <span className="font-medium">Email:</span> <span className="text-primary">{state?.auth?.user?.email ?? "Not Logged In"}</span>
                </h1>
                <div className="flex justify-center items-center pt-10">
                  <button
                    className="bg-red-500 text-white rounded-xl px-3 pb-2 pt-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
