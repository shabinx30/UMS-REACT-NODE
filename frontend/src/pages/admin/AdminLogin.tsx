import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { login } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // error animation
  const [isError, setError] = useState({
    status: false,
    message: '',
    divClass: 'error',
  })
  const errorRef = useRef<HTMLDivElement>(null)

  const validate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formSumission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios
      .post("http://localhost:4004/admin/login", formData)
      .then((res) => {
        if (res.data.message === 'success') {
          window.localStorage.setItem("jwtA", res.data.token);
          dispatch(login({ token: res.data.token, user: res.data.user }));

          navigate("/admin/users");
        }else{
          showError(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showError = (message: string) => {
    setError({
      status: true,
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
  },[isError])

  return (
    <>
      {isError.status && (
        <div className="w-full z-30 fixed flex justify-center items-center">
          <div ref={errorRef} className={isError.divClass}>
            <IoIosCloseCircle
              size={35}
              className="text-red-500 mt-0.5 ml-0.5"
            />
            <p>{isError.message}</p>
          </div>
        </div>
      )}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Admin
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={formSumission}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={validate}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={validate}
                    placeholder="&34@88$#!"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-black bg-primary hover:bg-primary-500 duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
