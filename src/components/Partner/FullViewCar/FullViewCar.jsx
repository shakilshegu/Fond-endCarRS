import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

const FullViewCar = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-8 mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-4">{data?.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img
                  src={data?.Images[0]}
                  alt="Car"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4">
                <ul className="font-semibold">
                  <li className="flex items-center">
                    <span className="text-gray-600 mr-2">Brand:</span>
                    {data?.brand}
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600 mr-2">Category:</span>
                    {data?.category.name}
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600 mr-2">Price:</span>$
                    {data?.price}
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600 mr-2">Year:</span>
                    {data?.year}
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600 mr-2">Mileage:</span>
                    {data?.mileage}
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600 mr-2">Color:</span>
                    {data?.color}
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-600 mr-2">Location:</span>
                    {data?.location}
                  </li>
                </ul>
                <p className="text-gray-700">{data?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FullViewCar;
