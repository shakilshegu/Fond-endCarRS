import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { AxiosPartner } from "../../../Api/Axiosinstance";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PartnerProfile = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const partnerToken = localStorage.getItem("partnerToken");
  const headers = { authorization: partnerToken };
  const getData = async () => {
    try {
      const response = await AxiosPartner.post(
        `getpartnerinfobyid`,
        {},
        {
          headers,
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setLocation = async (e) => {
    try {
      e.preventDefault();
      const response = await AxiosPartner.post(
        `UploadLocation`,
        { data, location: e.target.location.value },
        { headers }
      );
      if (response.data.success) {
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

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-10 ">
        <section className=" col-span-5 bg-blueGray-50 relative ">
          <div className=" flex w-full  px-4 mx-auto">
            <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
              <h1 className=" mt-2 text-center text-3xl font-semibold">
                Profile
              </h1>
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      <img
                        alt="iamge"
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        className="  shadow-xl rounded-full h-auto align-middle border-none  w-40 "
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                    {data?.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <p className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">
                      {data?.email}
                    </p>
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {data?.phone}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    {data?.name}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center ">
                <div className="m-5">
                  <button
                    onClick={() => navigate("/partner/Editprofile")}
                    className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="col-span-5 mt-20 px-8 ">
          <form class="max-w-2xl" action="" onSubmit={setLocation}>
            <div class="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
              <h2 class="text-xl text-gray-600 dark:text-gray-300 pb-2">
                Add Locations
              </h2>
              <div class="flex flex-col gap-2 w-full border-gray-400">
                <div>
                  <label class="text-gray-600 dark:text-gray-400">
                    Locations
                  </label>
                  <input
                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                    type="text"
                    name="location"
                  />
                </div>

                <div>
                  <label class="text-gray-600 dark:text-gray-400">
                    Adhaar No
                  </label>
                  <input
                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                    type="text"
                  />
                </div>

                <div class="flex justify-end">
                  <button
                    class="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                    type="submit"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PartnerProfile;
