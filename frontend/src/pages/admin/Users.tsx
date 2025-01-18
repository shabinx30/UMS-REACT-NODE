import axios from "axios";
import React, { useEffect, useState } from "react";

const Users: React.FC = () => {
  interface userType {
    id: string;
    name: string;
    profile: string;
    email: string;
  }

  const [render, setRender] = useState("");
  const [users, setUsers] = useState<userType[]>([]);

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
        setRender("deleted");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const editUser = (id: number | string): Promise<void> => {

  // }

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
        setRender("searched");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="py-32 md:px-20 px-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div>
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                <span className="sr-only">Action button</span>
                Action
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdownAction"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownActionButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Activate account
                    </a>
                  </li>
                </ul>
              </div>
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
                        // onClick={() => editUser(user.id)}
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
