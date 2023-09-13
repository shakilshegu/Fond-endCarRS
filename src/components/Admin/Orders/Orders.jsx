import React, { useEffect, useState } from "react";
import Home from "../Home/Home";
import { AxiosAdmin } from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";

const Orders = () => {
  const [Order, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await AxiosAdmin.get(`getBooking`);
      if (response.data.success) {
        setOrders(response.data.Data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <div>
        <div className="flex  ">
          <div className="w-[22%]">
            <Home />
          </div>
          <div className="pt-10 w-full mx-12">
            <h1 className="font-bold text-2xl">Orders </h1>
            <table class="min-w-full divide-y divide-gray-200 overflow-x-auto">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
         
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {Order.map((order) => (
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img
                            class="h-10 w-10 rounded-full"
                            src={order.userId.image}
                            alt=""
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {order.userId.name}
                          </div>
                          <div class="text-sm text-gray-500">
                            {order.userId.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        Regional Paradigm Technician
                      </div>
                      <div class="text-sm text-gray-500">Optimization</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      User
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.userId.email}
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
