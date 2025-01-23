import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { IoIosCloseCircle, IoMdCheckmarkCircle } from "react-icons/io";

interface FormDataState {
  id: string;
  profile: string | null;
  name: string;
  email: string;
  preEmail: string;
}

type FormDataType = {
  profile: File | null;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Users: React.FC = () => {
  interface userType {
    id: string;
    name: string;
    profile: string;
    email: string;
  }

  const [render, setRender] = useState(0);
  const [users, setUsers] = useState<userType[]>([]);
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addModal, setAddModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState<FormDataState>({
    id: "",
    profile: null,
    name: "",
    email: "",
    preEmail: "",
  });

  //add
  const [addFormData, setAddFormData] = useState<FormDataType>({
    profile: null,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [valid, setValid] = useState({
    profile: { status: true, message: "" },
    name: { status: true, message: "" },
    email: { status: true, message: "" },
  });
  //add
  let status = false;
  const [addValid, setAddValid] = useState({
    profile: { status: true, message: "" },
    name: { status: true, message: "" },
    email: { status: true, message: "" },
    password: { status: true, message: "" },
    confirmPassword: { status: true, message: "" },
  });

  // error animation state
  const [isError, setError] = useState({
    status: false,
    symbol: true,
    message: "",
    divClass: "error",
  });
  const errorRef = useRef<HTMLDivElement>(null);

  let count = 0;

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const response = await axios.get("http://localhost:4004/admin/users", {
          headers: {
            Authorization: localStorage.getItem("jwtA"),
          },
        });

        if (response.data.message) {
          setUsers(response.data.users.rows);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [render]);

  // const navigate = useNavigate()

  const deleteUser = async (id: number | string): Promise<void> => {
    try {
      const response = await axios.delete(
        `http://localhost:4004/admin/deleteUser?id=${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtA"),
          },
        }
      );
      if (response.data.status) {
        setRender(++count);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchUser = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      const value = e.target.value;
      const response = await axios.get(
        `http://localhost:4004/admin/searchUser?name=${value}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwtA"),
          },
        }
      );
      if (response.data.result) {
        setUsers(response.data.result);
        setRender(++count);
        // --count;
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowModal(false); 
    setTimeout(() => setModal(false), 300); 
    setRender(++count);
    // --count
  };

  const openModal = (
    id: string,
    profile: string,
    name: string,
    email: string
  ) => {
    setFormData({
      ...formData,
      id,
      profile,
      name,
      email,
    });
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
        "http://localhost:4004/editUser",
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
        showError("Updated successfully!!!", false);
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

  const closeAddModal = () => {
    setShowAddModal(false); 
    setTimeout(() => setAddModal(false), 300); 
    setRender(++count);
    // --count
  };

  const openAddModal = () => {
    setAddModal(true);
    setTimeout(() => setShowAddModal(true), 10);
  };


  //validation
  const addValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value, type, files } = e.target as HTMLInputElement;
    // console.log('file type is', files)
    if (type === "file" && files) {
      setAddFormData((prevAddData) => ({
        ...prevAddData,
        [name]: files[0],
      }));
    } else {
      setAddFormData((prevAddData) => ({
        ...prevAddData,
        [name]: value,
      }));
    }

    // validations
    if (name === "name" && value.trim() === "") {
      setAddValid({
        ...addValid,
        name: { status: false, message: "Enter your name!" },
      });
      return;
    } else if (name === "name" && value.trim() !== "") {
      setAddValid({ ...addValid, name: { status: true, message: "" } });
    }

    if (name === "email") {
      if (value.trim() === "") {
        setAddValid({
          ...addValid,
          email: { status: false, message: "Enter your email address!" },
        });
        return;
      } else {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setAddValid({
            ...addValid,
            email: {
              status: false,
              message: "Enter your valid email address!",
            },
          });
          return;
        } else {
          setAddValid({ ...addValid, email: { status: true, message: "" } });
        }
      }
    }

    if (name === "password") {
      if (value.trim() !== "") {
        if (value.length < 8) {
          setAddValid({
            ...addValid,
            password: {
              status: false,
              message: "Password should be at least 8 characters long!",
            },
          });
          return;
        }
        if (value.toLowerCase() === value) {
          setAddValid({
            ...addValid,
            password: {
              status: false,
              message: "Password should contain at least one uppercase letter!",
            },
          });
          return;
        }
        if (value.toUpperCase() === value) {
          setAddValid({
            ...addValid,
            password: {
              status: false,
              message: "Password should contain at least one lowercase letter!",
            },
          });
          return;
        }
        if (!/[0-9]/.test(value)) {
          setAddValid({
            ...addValid,
            password: {
              status: false,
              message: "Password should contain at least one number!",
            },
          });
          return;
        }
        if (!/[-!@#$%^&*()+]/.test(value)) {
          setAddValid({
            ...addValid,
            password: {
              status: false,
              message:
                "Password should contain at lease one special character!",
            },
          });
          return;
        }

        setAddValid({ ...addValid, password: { status: true, message: "" } });
      } else {
        setAddValid({
          ...addValid,
          password: { status: false, message: "Password is required!" },
        });
        return;
      }
    }

    if (name === "confirmPassword") {
      if (value.trim() === "") {
        setAddValid({
          ...addValid,
          confirmPassword: {
            status: false,
            message: "Confirm password is required!",
          },
        });
        return;
      } else {
        if (addFormData.password !== value) {
          setAddValid({
            ...addValid,
            confirmPassword: {
              status: false,
              message: "Password is not matching!",
            },
          });
          return;
        } else {
          setAddValid({
            ...addValid,
            confirmPassword: { status: true, message: "" },
          });
        }
      }
    }
    status = true;
  };

  const formSubmission = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (!addFormData.profile) {
        setAddValid({
          ...addValid,
          profile: { status: false, message: "Add your profile photo!" },
        });
        return;
      } else if (!status) {
        if (!addFormData.name) {
          setAddValid({
            ...addValid,
            name: { status: false, message: "Enter your name!" },
          });
          return;
        }
        if (!addFormData.email) {
          setAddValid({
            ...addValid,
            email: { status: false, message: "Enter your email!" },
          });
          return;
        }
        if (!addFormData.password) {
          setAddValid({
            ...addValid,
            password: { status: false, message: "Password is requied!" },
          });
          return;
        }
        if (!addFormData.confirmPassword) {
          setAddValid({
            ...addValid,
            confirmPassword: {
              status: false,
              message: "Confirm password is requied!",
            },
          });
          return;
        }
      }

      console.log("new", addFormData);

      let data = new FormData();

      for (let key in addFormData) {
        const value:any = addFormData[key as keyof typeof addFormData];
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
            // window.localStorage.setItem("jwt", res.data.token);
            // dispatch(login({ token: res.data.token, user: res.data.user }));
            // setTimeout(() => {
            //   navigate("/profile");
            // }, 500);
            closeAddModal()
            setRender(++count)
          } else {
            console.log(res.data.message);

            //show the error message
            showError(res.data.message,true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error)
    }
  }

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
      {addModal && (
        <div
          onClick={closeAddModal}
          className={`z-10 transition-opacity duration-300 absolute w-full h-full bg-black/25 backdrop-blur-[5px] ${
            showAddModal ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 transition-transform"
            >
              <IoIosCloseCircle
                onClick={closeAddModal}
                size={30}
                className="absolute right-4 top-4 text-primary cursor-pointer"
              />
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex justify-center ">
                <div className="block ">
                  <form
                    noValidate
                    className="space-y-4 md:space-y-6"
                    onSubmit={formSubmission}
                  >
                    <div>
                      <label
                        htmlFor="profile"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {addValid.profile.message ? (
                          <span className="text-red-500">
                            {addValid.profile.message}
                          </span>
                        ) : (
                          "Your profile photo"
                        )}
                      </label>
                      <input
                        name="profile"
                        type="file"
                        id="profile"
                        onChange={addValidate}
                        className={
                          addValid.profile.status ? regularClass : errorClass
                        }
                        accept="image/*"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {addValid.name.message ? (
                          <span className="text-red-500">
                            {addValid.name.message}
                          </span>
                        ) : (
                          "Your name"
                        )}
                      </label>
                      <input
                        onChange={addValidate}
                        type="text"
                        name="name"
                        id="name"
                        className={
                          addValid.name.status ? regularClass : errorClass
                        }
                        placeholder="Alice"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {addValid.email.message ? (
                          <span className="text-red-500">
                            {addValid.email.message}
                          </span>
                        ) : (
                          "Your email"
                        )}
                      </label>
                      <input
                        onChange={addValidate}
                        type="email"
                        name="email"
                        id="email"
                        className={
                          addValid.email.status ? regularClass : errorClass
                        }
                        placeholder="example@company.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {addValid.password.message ? (
                          <span className="text-red-500">
                            {addValid.password.message}
                          </span>
                        ) : (
                          "Password"
                        )}
                      </label>
                      <input
                        onChange={addValidate}
                        type="password"
                        name="password"
                        placeholder="&34@88$#!"
                        className={
                          addValid.password.status ? regularClass : errorClass
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {addValid.confirmPassword.message ? (
                          <span className="text-red-500">
                            {addValid.confirmPassword.message}
                          </span>
                        ) : (
                          "Confirm Password"
                        )}
                      </label>
                      <input
                        onChange={addValidate}
                        type="password"
                        name="confirmPassword"
                        placeholder="&34@88$#!"
                        className={
                          addValid.confirmPassword.status
                            ? regularClass
                            : errorClass
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-black bg-primary hover:bg-primary-500 duration-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Activate
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="py-32 md:px-20 px-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div>
              <button
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
                onClick={openAddModal}
              >
                Activate a user
              </button>
            </div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="table-search-users"
                onChange={searchUser}
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-primary">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (
                users.map((user, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`http://localhost:4004/${user.profile}`}
                        alt="Profile"
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {user.name}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="flex items-center">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        // href="#"
                        onClick={() =>
                          openModal(
                            user.id,
                            user.profile,
                            user.name,
                            user.email
                          )
                        }
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit user
                      </a>
                      <a
                        // href="#"
                        onClick={() => deleteUser(user.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3"
                      >
                        Delete user
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td className="pt-10">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
