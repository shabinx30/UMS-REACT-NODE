import { logout, RootState } from "../../redux/store";
import React, { FormEvent, useState } from "react";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbUserEdit } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const Profile: React.FC = () => {
  const state = useTypedSelector((state) => state);
  // console.log(state);
  const [modal, setModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    profile: null,
    name: "",
    email: "",
  });
  const [valid, setValid] = useState({
    profile: {status: true, message: ""},
    name: { status: true, message: "" },
    email: { status: true, message: "" },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const closeModal = () => {
    setShowModal(false); // Trigger fade-out animation
    setTimeout(() => setModal(false), 300); // Wait for animation to finish
  };

  const openModal = () => {
    setModal(true);
    setTimeout(() => setShowModal(true), 10); // Delay to trigger fade-in animation
  };


  //handling input
  const validate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  //validations
  const errorClass =
    "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500";
  const regularClass =
    "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {modal && (
        <div
          onClick={closeModal}
          className={`z-10 transition-opacity duration-300 absolute w-full h-full bg-black/25 backdrop-blur-[5px] ${
            showModal ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 transition-transform"
            >
              <IoIosCloseCircle
                onClick={closeModal}
                size={30}
                className="absolute right-4 top-4 text-primary cursor-pointer"
              />
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex justify-center ">
                <div className="block ">
                  <form noValidate onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div >
                      <label
                        htmlFor="profile"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {valid.profile.message ? (
                          <span className="text-red-500">
                            {valid.profile.message}
                          </span>
                        ) : (
                          "Your profile photo"
                        )}
                      </label>
                      <input
                        name="profile"
                        type="file"
                        id="profile"
                        onChange={validate}
                        className={
                          valid.profile.status ? regularClass : errorClass
                        }
                        accept="image/*"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {valid.name.message ? (
                          <span className="text-red-500">
                            {valid.name.message}
                          </span>
                        ) : (
                          "Your name"
                        )}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={state?.auth?.user?.name ?? "Not Logged In"}
                        onChange={validate}
                        className={
                          valid.name.status ? regularClass : errorClass
                        }
                        placeholder="Alice"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {valid.email.message ? (
                          <span className="text-red-500">
                            {valid.email.message}
                          </span>
                        ) : (
                          "Your email"
                        )}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={state?.auth?.user?.email ?? "Not Logged In"}
                        onChange={validate}
                        placeholder="example@company.com"
                        className={
                          valid.email.status ? regularClass : errorClass
                        }
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        type="submit"
                        className="bg-primary text-black rounded-xl px-3 pb-2 pt-1"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="bg-gray-50 dark:bg-gray-900 pt-14 md:pt-0">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="relative w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <TbUserEdit
              onClick={openModal}
              size={25}
              className="absolute right-5 top-5 text-primary cursor-pointer"
            />
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
                  <span className="font-medium">Name:</span>{" "}
                  <span className="text-primary">
                    {state?.auth?.user?.name ?? "Not Logged In"}
                  </span>
                </h1>
                <h1 className="text-white">
                  <span className="font-medium">Email:</span>{" "}
                  <span className="text-primary">
                    {state?.auth?.user?.email ?? "Not Logged In"}
                  </span>
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
