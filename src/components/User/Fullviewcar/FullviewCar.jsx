import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { useLocation } from "react-router-dom";
import { AxiosUser } from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";
import Footer from "../Footer/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import {Carousel} from "react-responsive-carousel"

const FullviewCar = () => {
  const [ratingData, setRatingData] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const [bookingMessage, setBookingMessage] = useState("");
  const [pickLocation, setpickLocation] = useState("");
  const [DropeLocation, setDropeLocation] = useState("");

  const location = useLocation();
  const data = location.state;
  const places = location.state.partnerId.location;

  const usertoken = localStorage.getItem("token");
  const headers = { authorization: usertoken };

  const getreview = async () => {
    try {
      const response = await AxiosUser.get(`GetRating/${data._id}`, {}, {});
      if (response.data.data) {
        setRatingData(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong111");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickLocation) {
      setBookingMessage("Please select a pickup location.");
    } else if (totalAmount > 0) {
      const availabilityResponse = await AxiosUser.get(
        `CheckAvailability/${data._id}`
      );
      const bookedDateRanges = availabilityResponse.data;

      const selectedStartDate = new Date(startDate).getTime();
      const selectedEndDate = new Date(endDate).getTime();

      let isDateAvailable = true;
      for (const bookedRange of bookedDateRanges) {
        const bookedStart = new Date(bookedRange.startDate).getTime();
        const bookedEnd = new Date(bookedRange.endDate).getTime();

        if (
          (selectedStartDate >= bookedStart &&
            selectedStartDate <= bookedEnd) ||
          (selectedEndDate >= bookedStart && selectedEndDate <= bookedEnd)
        ) {
          isDateAvailable = false;
          break;
        }
      }

      if (isDateAvailable) {
        var options = {
          key: "rzp_test_z6zqoNJq1V7ZN3",
          key_secret: "EAxochtnPd3veugWJyRJRnit",
          currency: "INR",
          name: "CarRS",
          description: "for testing purpose",
          amount: totalAmount * 100,
          handler: function (response) {
            alert("Payment Successful!");
            handleBooking();
          },
          prefill: {
            name: "Shakil",
            email: "muhammadshakil1968.com",
            contact: "9544681968",
          },
          notes: {
            address: "Razorpay Corporate office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        var pay = new window.Razorpay(options);
        pay.open();
      } else {
        setBookingMessage("Selected dates are not available for booking.");
      }
    } else {
      setBookingMessage("Please select the Date");
    }
  };

  const handleBooking = async () => {
    try {
      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();
      const daysDifference =
        (endTimestamp - startTimestamp) / (1000 * 3600 * 24);
      const total = daysDifference * data.price;
      const response = await AxiosUser.post(
        `Booking`,
        {
          token: usertoken,
          name: data.name,
          partnerId: data.partnerId,
          CarId: data._id,
          userId: data.userId,
          brand: data.brand,
          category: data.category,
          price: data.price,
          location: data.location,
          startDate: startDate,
          endDate: endDate,
          totalAmount: total,
          pickuplocation: pickLocation,
          Dropeuplocation: DropeLocation,
        },
        { headers }
      );
      if (response.data.success) {
        console.log(response.data.data);
        toast.success(response.data.message);
        navigate("/Success", { state: response.data.data });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Booking creation failed:", error);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    calculateTotalAmount(event.target.value, endDate);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    calculateTotalAmount(startDate, event.target.value);
  };

  const calculateTotalAmount = (start, end) => {
    if (start && end && data.price) {
      const startTimestamp = new Date(start).getTime();
      const endTimestamp = new Date(end).getTime();
      const daysDifference =
        (endTimestamp - startTimestamp) / (1000 * 3600 * 24);
      const total = daysDifference * data.price;
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  };
  useEffect(() => {
    getreview();
  }, []);
  return (
    <div>
      <Header />
      <div className="mt-8 w-full bg-white py-16 px-4">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <div class="max-w-2xl mx-auto mt-3 mr-6 ">
          <Carousel className="w-[600px] ">
                <div>
                    <img className="rounded-lg" src={data.Images[0]} />
                    <p className="legend">BMW M3 </p>
                </div>
                <div>
                    <img className="rounded-lg" src={data.Images[1]}/>
                    <p className="legend"> Inderior</p>
                </div>
                <div>
                    <img className="rounded-lg" src={data.Images[2]}/>
                    <p className="legend"> Door Inderior</p>
                </div>
            </Carousel>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
              {data?.name}
            </h1>
            <p className=" font-semibold text-2xl text-[#00df9a]">
              ${data?.price} / Day
            </p>

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas nam
              eaque unde voluptate velit? Maxime totam vel, ducimus excepturi
              nemo assumenda iusto quod deleniti numquam, alias quis aliquam
              atque ut!
            </p>

            <div className="mt-4">
              <p className="text-lg font-semibold">
                Partner: {data.partnerId.name}
              </p>
              <p className="text-lg font-semibold">
                Category: {data.category.name}
              </p>
              <p className="text-lg font-semibold">Color: {data?.color}</p>
              <p className="text-lg font-semibold">
                Mileage: {data?.mileage} miles
              </p>
              <p className="text-lg font-semibold">
                Location: {data?.location}
              </p>
            </div>
            <div className="flex">
              <div className="flex h-12 mt-6 ">
                <div className="relative " data-te-input-wrapper-init>
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    min={new Date().toISOString().split("T")[0]}
                    className=" bg-black peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-[#00df9a] dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Select a date"
                  />
                  <label
                    htmlFor="floatingInput"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-[#00df9a] dark:peer-focus:text-primary"
                  ></label>
                </div>
              </div>
              <div className="flex h-12 mt-6 ">
                <div className="relative " data-te-input-wrapper-init>
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={startDate}
                    className=" bg-black peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-[#00df9a] dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Select a date"
                  />
                  <label
                    htmlFor="floatingInput"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6]transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-[#00df9a] dark:peer-focus:text-primary"
                  ></label>
                </div>
              </div>
              <p className="mt-8 ml-3 font-bold">TOTAL=${totalAmount}</p>
            </div>
            <div className="flex">
              <div class="w-[250px] ml-3">
                <div className="w-[200px] ">
                  <label className="block font-medium"> Pick Location:</label>
                  <select
                    className="border rounded p-2 w-full bg-green-400"
                    value={pickLocation}
                    onChange={(e) => {
                      setpickLocation(e.target.value);
                      setBookingMessage("");
                    }}
                  >
                    <option value="" className="bg-white">
                      All Locations
                    </option>
                    {places.map((location, index) => (
                      <option className="bg-white" key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class=" ml-4 w-[250px]">
                <div class="w-[250px]">
                  <div className="w-[200px] ">
                    <label className="block font-medium ">
                      Drope Location:
                    </label>
                    <select
                      className="border rounded p-2 w-full bg-green-400"
                      value={DropeLocation}
                      onChange={(e) => setDropeLocation(e.target.value)}
                    >
                      <option value="" className="bg-white">
                        All Locations
                      </option>
                      {places.map((location, index) => (
                        <option
                          className="bg-white"
                          key={index}
                          value={location}
                        >
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {bookingMessage && (
              <p className="mt-4 text-red-500">{bookingMessage}</p>
            )}
            <div className="ml-3">
              <button
                onClick={handleSubmit}
                className="  bg-black  text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[500px] ml-auto mr-auto">
        {Array.isArray(ratingData) ? (
          ratingData.map((Rating, index) => (
            <div className="max-w-2xl mx-auto">
              <>
                <div className="flex items-center">
                  {Array.from({ length: Rating.stars }, (_, starIndex) => (
                    <svg
                      key={starIndex}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <div className="ml-auto text-right">
                    <p className="font-semibold">{Rating?.userId.name}</p>
                  </div>
                </div>

                <p className="mt-5">{Rating?.review} .</p>
                <p className="font-semibold">
                  {" "}
                  {new Date(Rating?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </>
            </div>
          ))
        ) : (
          <p>ratingData is not an array.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FullviewCar;
