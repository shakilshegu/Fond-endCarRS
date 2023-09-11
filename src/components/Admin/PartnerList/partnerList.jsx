import React,{ useEffect, useState } from "react";
import Home from "../Home/Home";
import {AxiosAdmin} from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";

const PartnerList = () => {
     const [partner, setPartners] = useState([]);
     
    const getData = async () => {
        try {
          const response = await AxiosAdmin.get(`partnerList`);
          if (response.data.success) {
            setPartners(response.data.partner);
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
      },[]); 

      const blockorunblock = async (id)=>{
        const response = await AxiosAdmin(`partnerBlock?id=${id}`)
        if(response.data.success){
         setPartners(response.data.data)
         toast(response.data.message)
        }
   }
      
  return (
    <div>
      <div className="flex  ">
        <div className="w-[22%]">
          <Home />
        </div>
        <div className="pt-10 w-full mx-12">
          <div class="relative overflow-x-auto">
            <h1 className="font-bold text-2xl ">Partners Details</h1>
            <table class="w-full mt-2 text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                 
                  <th scope="col" class="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" class="px-6 py-3">
                    phone
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Approved
                  </th>
                </tr>
              </thead>
              <tbody>
                {partner.map((partners)=>(
                   <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                   <th
                     scope="row"
                     class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                   >
                    {partners?.name}
                   </th>
                   <td class="px-6 py-4">{partners?.email}</td>
                   <td class="px-6 py-4"> {partners?._id}</td>
                   <td class="px-6 py-4">{partners?.phone}</td>
                   <td class="px-6 py-4">{partners.isBlocked?<button onClick={()=>{blockorunblock(partners._id)}} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">NotApproved</button>:<button onClick={()=>{blockorunblock(partners._id)}} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approved</button>}</td>
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

export default PartnerList;
