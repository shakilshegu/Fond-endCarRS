import React, { useEffect, useState } from "react";
import Home from "../Home/Home";
import { AxiosAdmin } from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";

function UserList() {
  const [users, setUsers] = useState([]);
  const getData = async () => {
    try {
      const response = await AxiosAdmin.get(`userList`);
      if (response.data.success) {
        setUsers(response.data.users);
        console.log(users);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const blockorunblock = async (id) => {
    try {
      const response = await AxiosAdmin(`userBlock?id=${id}`);
      if (response.data.success) {
        setUsers(response.data.userData);
        toast(response.data.message);
      }else{
        toast.error(response.data.message);
      }
      
    } catch (error) {
      toast.error("Something went wrong");
    }
   
  };

  const Verification = async (id)=>{
      try {
        const response = await AxiosAdmin(`Verification?id=${id}`);
        if (response.data.success) {
          setUsers(response.data.userData);
          toast(response.data.message);
        }else{
          toast.error(response.data.message);
        }

      } catch (error) {
        toast.error("Something went wrong");
      }
  }

  return (
    <>
      <div className="flex  ">
        <div className="w-[22%]">
          <Home />
        </div>
        <div className="pt-10 w-full mx-12">
          <div className="relative overflow-x-auto">
            <h1 className="font-bold text-2xl ">User Details</h1>
            <table className="w-full mt-2 text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Verification Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user?.name}
                    </th>
                    <td className="px-6 py-4">{user?.email}</td>
                    <td className="px-6 py-4">{user?._id}</td>
                    <td className="px-6 py-4">
                      {user.isUser ? (
                        <button
                          onClick={() => {
                            Verification(user._id);
                          }}
                          type="button"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          Unapproved
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            Verification(user._id);
                          }}
                          type="button"
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                         Approved
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {user.isBlocked ? (
                        <button
                          onClick={() => {
                            blockorunblock(user._id);
                          }}
                          type="button"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            blockorunblock(user._id);
                          }}
                          type="button"
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          Unblock
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
