import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { AxiosUser } from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import { useNavigate } from "react-router-dom";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usertoken = localStorage.getItem("token");
  const headers = { authorization: usertoken };
  const [bookingData, setBookingData] = useState([]);

  const [userReviews, setUserReviews] = useState([]);
  const [bookingId, setBookingId] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;
  const totalPages = Math.ceil(bookingData.length / bookingsPerPage);

  const startIndex = (currentPage - 1) * bookingsPerPage;
  const endIndex = startIndex + bookingsPerPage;
  const paginatedBookings = bookingData.slice(startIndex, endIndex);


  const [showModal, setShowModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  const handleCancelBooking = (bookingId) => {
    setBookingId(bookingId)

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCancellationReason("");
  };

  const handleReasonChange = (event) => {
    setCancellationReason(event.target.value);
  };

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await AxiosUser.post(
        `GetBookingDeatails`,
        {},
        {
          headers,
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setBookingData(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const postCancellation = async () => {
    try {
      const response = await AxiosUser.post(
        `cancellation`,
        { bookingId: bookingId, reason: cancellationReason },
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

  const hasUserReviewedCar = (carId) => {
    return userReviews.some((review) => review.carId === carId);
  };

  const handledetail = (booking) => {
    navigate("/Rating", { state: booking });
  };

  return (
    <div>
      <Header />
      <div>
        <h1 className="mt-2 text-center text-2xl font-bold">Booking History</h1>
        <div className="flex flex-col mt-5">
          <div className="-m-1.5 overflow-x-auto5">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden mx-6">
                <table className="min-w-full divide-y text-black divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                    {paginatedBookings.map((booking, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-black">
                          <img
                            className="w-[120px]"
                            src={booking.CarId.Images[0]}
                            alt=""
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-black">
                          {booking.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-black">
                          {booking.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-black">
                          {booking.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                          {booking.status !== "delivered" && (
                            <button
                              className="text-blue-500 hover:text-blue-700 mr-2"
                              onClick={() => handleCancelBooking(booking._id)}
                            >
                              Cancel
                            </button>
                          )}
                          {booking.status === "delivered" ? (
                            <>
                              {booking.RatingId ? (
                                <div>
                                  <h1 className="text-base">Already Rated</h1>
                                </div>
                              ) : (
                                <button
                                  className="text-yellow-500 hover:text-yellow-700"
                                  onClick={() => handledetail(booking)}
                                >
                                  Review
                                </button>
                              )}
                            </>
                          ) : (
                            <h
                              className={
                                booking.status === "pending"
                                  ? "text-red-500 hover:text-red-700"
                                  : booking.status === "confirmed"
                                  ? "text-green-500 hover:text-green-700"
                                  : "text-blue-500 hover:text-blue-700"
                              }
                            >
                              {booking.status}
                            </h>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {showModal && (
                  <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur-md">
                    <div className="bg-white rounded-lg p-6 w-96">
                      <h3 className="text-lg font-semibold mb-2">
                        Cancel Booking
                      </h3>
                      <input
                        type="text"
                        placeholder="Reason for cancellation"
                        value={cancellationReason}
                        onChange={handleReasonChange}
                        className="border rounded-md px-3 py-2 w-full mb-2"
                      />
                      <div className="flex justify-between">
                        <button
                          className="px-3 py-1 border rounded text-red-500 hover:text-red-700"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 border rounded text-green-500 hover:text-green-700"
                          onClick={() => {
                            postCancellation();
                            setBookingId();
                            handleCloseModal()
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-center mt-4">
                  <button
                    className="px-3 py-1 mx-1 border rounded"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 mx-1 border rounded"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
