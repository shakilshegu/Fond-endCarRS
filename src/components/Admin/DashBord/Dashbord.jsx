import React, { useEffect, useState } from "react";
import Home from "../Home/Home";
import { AxiosAdmin } from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";
import Barchart from "./Barchart";

const Dashbord = () => {
  const [dailyData, setDailyData] = useState(0);
  const [monthlyData, setMonthlyData] = useState(0);
  const [count, setcount] = useState(0);
  const [users, setusers] = useState(0);
  const [partner, setpartner] = useState(0);
  const [monthlyChategory, setMonthlyChategory] = useState([]);

  const fechBookings = async () => {
    try {
      const response = await AxiosAdmin.get(`getBooking`);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fechCounts = async () => {
    try {
      const response = await AxiosAdmin.get(`getTotalcount`);
      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response.data);
        setDailyData(response.data.lastTenDays);
        setMonthlyData(response.data.monthly);
        setMonthlyChategory(response.data.monthlyC);
        setusers(response.data.user);
        setpartner(response.data.partner);
        setcount(response.data.count);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fechBookings();
    fechCounts();
  }, []);

  return (
    <>
      <div className="flex  ">
        <Home />
        <div className="flex flex-col justify-center items-center w-full">
          <div className="ml-20 m-5  w-[1000px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white shadow-lg p-4 rounded-lg">
                <div className="flex items-center">
                  <div>
                    <p className="mb-2 text-gray-500">Total Revenue</p>
                    <div className="flex items-center">
                      <h5 className="mb-0 font-bold text-2xl">
                        ${monthlyData}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg p-4 rounded-lg">
                <div className="flex items-center">
                  <div>
                    <p className="mb-2 text-gray-500">Total Bookings</p>
                    <div className="flex items-center">
                      <h5 className="mb-0 font-bold text-2xl">{count}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg p-4 rounded-lg">
                <div className="flex items-center">
                  <div>
                    <p className="mb-2 text-gray-500">Users</p>
                    <div className="flex items-center">
                      <h5 className="mb-0 font-bold text-2xl">{users}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg p-4 rounded-lg">
                <div className="flex items-center">
                  <div>
                    <p className="mb-2 text-gray-500">Partners</p>
                    <div className="flex items-center">
                      <h5 className="mb-0 font-bold text-2xl">{partner}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" text-center ">
            <div className="m-4 mt-[50px] flex justify-center  items-center">
              <div className=" ">
                <div className="flex justify-center w-full">
                  <Barchart dailyRevenue={dailyData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashbord;
