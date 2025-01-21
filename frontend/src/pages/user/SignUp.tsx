import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  type FormDataType = {
    profile: File | null;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormDataType>({
    profile: null,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let status = false;
  const [valid, setValid] = useState({
    profile: { status: true, message: '' },
    name: { status: true, message: '' },
    email: { status: true, message: '' },
    password: { status: true, message: '' },
    confirmPassword: { status: true, message: '' },
  });
  const errorClass =
    "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500";
  const regularClass =
    "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // validations
    if (name === "name" && value.trim() === "") {
      setValid({ ...valid, name: { status: false, message: "Enter your name!" } });
      return;
    } else if (name === "name" && value.trim() !== "") {
      setValid({ ...valid, name: { status: true, message: "" } });
    }

    if (name === "email") {
      if (value.trim() === "") {
        setValid({ ...valid, email: { status: false, message: "Enter your email address!" } });
        return;
      } else {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setValid({ ...valid, email: { status: false, message: "Enter your valid email address!" } });
          return;
        } else {
          setValid({ ...valid, email: { status: true, message: "" } });
        }
      }
    }

    if (name === "password") {
      if (value.trim() !== "") {
        if (value.length < 8) {
          setValid({ ...valid, password: { status: false, message: "Password should be at least 8 characters long!" } });
          return;
        }
        if (value.toLowerCase() === value) {
          setValid({ ...valid, password: { status: false, message: "Password should contain at least one uppercase letter!" } });
          return;
        }
        if (value.toUpperCase() === value) {
          setValid({ ...valid, password: { status: false, message: "Password should contain at least one lowercase letter!" } });
          return;
        }
        if (!/[0-9]/.test(value)) {
          setValid({ ...valid, password: { status: false, message: "Password should contain at least one number!" } });
          return;
        }
        if (!/[-!@#$%^&*()+]/.test(value)) {
          setValid({ ...valid, password: { status: false, message: "Password should contain at lease one special character!" } });
          return;
        }

        setValid({ ...valid, password: { status: true, message: "" } });
      } else {
        setValid({ ...valid, password: { status: false, message: "Password is required!" } });
        return;
      }
    }

    if (name === "confirmPassword") {
      if (value.trim() === "") {
        setValid({ ...valid, confirmPassword: { status: false, message: "Confirm password is required!" } });
        return;
      } else {
        if (formData.password !== value) {
          setValid({ ...valid, confirmPassword: { status: false, message: "Password is not matching!" } });
          return;
        } else {
          setValid({ ...valid, confirmPassword: { status: true, message: "" } });
        }
      }
    }
    status = true;
  };

  const formSubmission = (e: FormEvent<HTMLFormElement>) => {
    // console.log('data inside the form', formData)
    e.preventDefault();

    if(!formData.profile){
      setValid({ ...valid, profile: {status: false, message: "Add your profile photo!"} })
      return
    }else if(!status) {
      if(!formData.name){
        setValid({ ...valid, name: {status: false, message: 'Enter your name!'} })
        return
      }
      if(!formData.email){
        setValid({ ...valid, email: {status: false, message: 'Enter your email!'} })
        return
      }
      if(!formData.password){
        setValid({ ...valid, password: {status: false, message: 'Password is requied!'} })
        return
      }
      if(!formData.confirmPassword){
        setValid({ ...valid, confirmPassword: {status: false, message: 'Confirm password is requied!'} })
        return
      }
    }


    let data = new FormData();

    for (let key in formData) {
      const value = formData[key as keyof typeof formData];
      if (value instanceof File) {
        data.append(key, value);
      } else if (value !== null && typeof value === "string") {
        data.append(key, value);
      }
    }

    // console.log(data)

    axios
      .post("http://localhost:4004/signUp", data)
      .then((res) => {
        if (res.data.message === "success") {
          window.localStorage.setItem("jwt", res.data.token);
          dispatch(login({ token: res.data.token, user: res.data.user }));
          setTimeout(() => {
            navigate("/profile");
          }, 500);
        }else{
          console.log(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formSubmission}
              >
                <div>
                  <label
                    htmlFor="profile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {valid.profile.message ? <span className="text-red-500">{valid.profile.message}</span> : 'Your profile photo'}
                  </label>
                  <input
                    name="profile"
                    type="file"
                    id="profile"
                    onChange={validate}
                    className={valid.profile.status ? regularClass : errorClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {valid.name.message ? <span className="text-red-500">{valid.name.message}</span> : 'Your name'}
                  </label>
                  <input
                    onChange={validate}
                    type="text"
                    name="name"
                    id="name"
                    className={valid.name.status ? regularClass : errorClass}
                    placeholder="Alice"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {valid.email.message ? <span className="text-red-500">{valid.email.message}</span> : 'Your email'}
                  </label>
                  <input
                    onChange={validate}
                    type="email"
                    name="email"
                    id="email"
                    className={valid.email.status ? regularClass : errorClass}
                    placeholder="example@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {valid.password.message ? <span className="text-red-500">{valid.password.message}</span> : 'Password'}
                  </label>
                  <input
                    onChange={validate}
                    type="password"
                    name="password"
                    placeholder="&34@88$#!"
                    className={valid.password.status ? regularClass : errorClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {valid.confirmPassword.message ? <span className="text-red-500">{valid.confirmPassword.message}</span> : 'Confirm Password'}
                  </label>
                  <input
                    onChange={validate}
                    type="password"
                    name="confirmPassword"
                    placeholder="&34@88$#!"
                    className={
                      valid.confirmPassword.status ? regularClass : errorClass
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-black bg-primary hover:bg-primary-500 duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary hover:underline dark:text-primary-500 cursor-pointer"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
