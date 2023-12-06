import React, { useEffect, useState } from "react";
import Header from "../Header/header";
import { AxiosUser } from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";

const ViewCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [car, setCar] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handledetail = (data) => {
    navigate("/FullviewCar", {
      state: data,
    });
  };

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await AxiosUser(`CarList`);
      dispatch(hideLoading());
      if (response.data.success) {
        setCar(response.data.cardata);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
      getData();
  }, []);

  const filteredCar = car
    .filter((data) => {
      return (
        (selectedLocation === "" || data.location === selectedLocation) &&
        (selectedBrand === "" || data.brand === selectedBrand) &&
        (selectedYear === "" || parseInt(data.year) === parseInt(selectedYear))
      );
    })
    .filter((data) => {
      if (searchQuery === "") {
        return true;
      }
      return data.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (selectedSort === "price-asc") {
        return a.price - b.price;
      } else if (selectedSort === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });
  const availableLocations = [...new Set(car.map((data) => data.location))];
  const availableBrand = [...new Set(car.map((data) => data.brand))];

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredCar.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCars = filteredCar.slice(startIndex, endIndex);

  return (
    <>
    <div>
      <Header />
      <p className="text-lgc justify-center  font-bold items-center text-center text-3xl mt-4 ">
        {" "}
        CAR DETAILES
      </p>
      <div className=""></div>

      <div className="ml-9 w-[500px] flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="mr-4">
            <label className="block font-medium">Brand:</label>
            <select
              className="border rounded p-2 w-full"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {availableBrand.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[180px] ">
            <label className="block font-medium">Sort By:</label>
            <select
              className="border rounded p-2 w-full"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>
          <div className="w-[200px] ">
            <label className="block font-medium">Location:</label>
            <select
              className="border rounded p-2 w-full"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {availableLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2 ml-2 mt-4 relative mx-auto text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5  pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="w-[100%]  flex justify-center px-5 py-8">
        <div className="grid w-[100%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {visibleCars.map((data, index) => (
            <div
              key={index}
              className="max-w-sm  ml-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700"
            >
              <i href="#">
                <img
                  className="w-full rounded-t-lg"
                  src={data?.Images[0]}
                  alt="car images"
                />
              </i>
              <div className="p-5">
                <i href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data?.name}
                  </h5>
                </i>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {data?.description}.
                </p>
                <div className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Price: ${data?.price}
                </div>
                <div className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Location: {data?.location}
                </div>
                <div className="flex">
                  <i
                    href="#"
                    onClick={() => handledetail(data)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-[#00df9a] text-Black rounded-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-white-700 dark:focus:ring-blue-800"
                  >
                    Booking Now
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </i>
                  <div className="flex "></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="bg-white p-4 flex items-center justify-center flex-wrap">
          <nav aria-label="Page navigation">
            <ul className="inline-flex">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    className={`h-10 px-5 ${
                      currentPage === index + 1
                        ? "text-white bg-green-600"
                        : "text-green-600"
                    } transition-colors duration-150 ${
                      index === 0 ? "rounded-l-lg" : ""
                    } ${
                      index === totalPages - 1 ? "rounded-r-lg" : ""
                    } focus:shadow-outline hover:bg-green-100`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
     <Footer/>
     </>
  );
};

export default ViewCar;
