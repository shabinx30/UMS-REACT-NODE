import { logout, RootState } from "../../redux/store";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbUserEdit } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMdCheckmarkCircle } from "react-icons/io";
import axios from "axios";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
interface FormDataState {
  id: number;
  profile: string | null;
  name: string;
  email: string;
  preEmail: string;
}

const Profile: React.FC = () => {
  const state = useTypedSelector((state) => state);
  console.log(state);
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    id: state?.auth?.user?.id,
    profile: state?.auth?.user?.profile,
    name: state?.auth?.user?.name,
    email: state?.auth?.user?.email,
    preEmail: state?.auth?.user?.email
  });
  const [valid, setValid] = useState({
    profile: { status: true, message: "" },
    name: { status: true, message: "" },
    email: { status: true, message: "" },
  });

  // error animation state
  const [isError, setError] = useState({
    status: false,
    symbol: true,
    message: "",
    divClass: "error",
  });
  const errorRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setModal(false), 300);
  };

  const openModal = () => {
    setModal(true);
    setTimeout(() => setShowModal(true), 10);
  };

  //handling input
  const validate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value, type, files } = e.target as HTMLInputElement;
    // console.log('file type is', files)
    if (type === "file" && files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  //validations
  const errorClass =
    "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500";
  const regularClass =
    "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        // Re-validation
        if (!formData.name) {
          setValid({
            ...valid,
            name: { status: false, message: "Enter your name!" },
          });
          return;
        }
        setValid({ ...valid, name: { status: true, message: "" } });

        if (!formData.email) {
          setValid({
            ...valid,
            email: { status: false, message: "Enter your email!" },
          });
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setValid({
            ...valid,
            email: { status: false, message: "Enter a valid email address!" },
          });
          return;
        }
        setValid({ ...valid, email: { status: true, message: "" } });

        

        // Prepare data for submission
        let data = new FormData();
        for (let key in formData) {
          const value: any = formData[key as keyof typeof formData];
          if (value instanceof File) {
            data.append(key, value);
          } else if (value !== null && typeof value === "string") {
            data.append(key, value);
          }
        }


        // Submit data
        const res = await axios.post(
          "https://ums-react-node.onrender.com/editUser",
          data,
          {
            headers: {
              Authorization: localStorage.getItem("jwtA")
            },
          }
        );        
        if (res.data.message === "success") {
          // window.localStorage.setItem("jwt", res.data.token);
          // dispatch(login({ token: res.data.token, user: res.data.user }));
          showError('Updated successfully!!!',false)
          closeModal();
        } else {
          console.log(res.data.message);
          showError(res.data.message, true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    

  //showing the error
  const showError = (message: string, symbol: boolean) => {
      setError({
        status: true,
        symbol,
        message,
        divClass: "error",
      });
  };

  useEffect(() => {
    if (errorRef.current) {
      const div = errorRef.current;
      div.style.animation = "errorS 0.5s ease forwards";

      setTimeout(() => {
        div.style.animation = "errorF 0.5s ease forwards";
      }, 3000);

      setTimeout(() => {
        setError((prev) => ({ ...prev, status: false }));
      }, 3500);
    }
  }, [isError]);

  return (
    <>
      {isError.status && (
        <div className="w-full z-30 fixed flex justify-center items-center">
          <div ref={errorRef} className={isError.divClass}>
            {isError.symbol ? (
              <IoIosCloseCircle
                size={35}
                className="text-red-500 mt-0.5 ml-0.5"
              />
            ) : (
              <IoMdCheckmarkCircle
                size={35}
                className="text-green-500 mt-0.5 ml-0.5"
              />
            )}
            <p>{isError.message}</p>
          </div>
        </div>
      )}
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
                  <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6"
                  >
                    <div>
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
                        value={formData.name ?? "Not Logged In"}
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
                        value={formData.email ?? "Not Logged In"}
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
                    src={`https://ums-react-node.onrender.com/${state?.auth?.user?.profile}`}
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
                    className="border-2 border-red-500 text-red-500 rounded-2xl hover:rounded-sm px-3 pb-2 pt-1 hover:text-white hover:bg-red-500 duration-300"
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
