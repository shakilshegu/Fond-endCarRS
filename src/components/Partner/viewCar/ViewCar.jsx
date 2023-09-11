import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { AxiosPartner } from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DeleteCModal from "../Modal/DeleteCModal";

const ViewCar = () => {
  const [car, setCar] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  
  const partnerToken = localStorage.getItem("partnerToken");
  const headers = { authorization: partnerToken };

  const getData = async () => {
    try {
      const response = await AxiosPartner.post(
        `viewCar`,
        { page: currentPage, limit: carsPerPage, searchQuery },
        {
          headers,
        }
      );
      if (response.data.success) {
        setCar(response.data.cardata);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const deleteCar = async (carId) => {
    setCarToDelete(carId);
    setShowDeleteModal(true);
  };

  const handledetail = (data) => {
    navigate("/partner/EditCar", { state: data });
  };
  const handleViewdetail = (data) => {
    navigate("/partner/FullViewCar", { state: data });
  };
  useEffect(() => {
    getData();
  }, [currentPage, searchQuery]);

  return (
    <div className="">
      <Navbar />
      <div className=" mt-2 relative overflow-x-auto shadow-md sm:rounded-lg mx-4">
        <div className="pb-4 bg-white dark:bg-white">
          <label for="table-search " className="mt-6 text-2xl font-bold mt-2sr-only text-black">
          CAR DETAILES
          </label>
          <div className="relative mt-4 ml-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-black dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Car Image
              </th>
              <th scope="col" className="px-6 py-3">
                Decription
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Year
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className=" text-center px-6 py-3">
                View
              </th>
              <th scope="col" className=" text-center ml-3 px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {car
              .slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage)
              .map((data) => (
                <tr className="bg-white border-b text-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-300 ">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <span>
                      {" "}
                      <img className="w-[120px]" src={data?.Images} alt="" />
                    </span>
                  </th>
                  <td className="w-[400px] px-6 py-4">{data?.description}</td>
                  <td className=" px-6 py-4">{data?.brand}</td>
                  <td className=" px-6 py-4">{data?.category.name}</td>
                  <td className="px-6 py-4">{data?.year}</td>
                  <td className="px-6 py-4">${data?.price}</td>
                  <td className="px-6 py-4 text-center">
                    <button  onClick={() => handleViewdetail(data)} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                      <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        View More
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handledetail(data)}
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCar(data._id)}
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="pagination flex items-center justify-center mt-4 space-x-2">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="bg-blue-500 text-white border-none py-2 px-4 rounded cursor-pointer transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    Previous
  </button>
  <span className="text-lg font-semibold">{currentPage}</span>
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={car.length < carsPerPage || car.length === 0}
    className="bg-blue-500 text-white border-none py-2 px-4 rounded cursor-pointer transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    Next
  </button>
</div>
      <div className="mt-7">
        <Footer />
      </div>
      {showDeleteModal && (
        <DeleteCModal
          onClose={() => setShowDeleteModal(false)}
          onDelete={async () => {
            setShowDeleteModal(false);
            if (carToDelete) {
              try {
                const response = await AxiosPartner.delete(
                  `deleteCar/${carToDelete}`,
                  {}
                );
                if (response.data.success) {
                  toast.success(response.data.message);
                  setCar(car.filter((data) => data._id !== carToDelete)); // Remove the deleted car from the state
                } else {
                  toast.error(response.data.message);
                }
              } catch (error) {
                toast.error("Something went wrong");
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default ViewCar;
