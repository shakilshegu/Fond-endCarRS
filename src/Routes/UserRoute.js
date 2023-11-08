import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "../pages/User page/HomePage";
import LoginPage from "../pages/User page/LoginPage.jsx";
import Signup from "../components/User/Signup/Signup";
import UserProfile from "../components/User/UserProfile/UserProfile";
import BookingHistory from "../components/User/BookingHistory/BookingHistory";
import ViewCars from "../components/User/ViewCar/viewCar.jsx";
import { useSelector } from "react-redux";
import { PublicRoute } from "../utils/PublicRoutes.js";
import { ProtectedRoute } from "../utils/ProtectedRoute";
import FullviewCar from "../components/User/Fullviewcar/FullviewCar";
import EditUserprofile from "../components/User/EditUserprofile/EditUserprofile";
import PaymentSuccess from "../components/User/PaymentSucces/paymentSuccess";
import Otppage from "../components/User/OTP/Otppage";
import Rating from "../components/User/RatingandReview/Rating.jsx";
import Chats from "../components/User/Chats/Chats";
import Invoice from "../components/User/Invoice/Invoice";
import CurrentOrders from "../components/User/Orders/CurrentOrders";
import NotFound from "../404";
import Constacts from "../components/User/Contacts/Constacts";

const UserRoute = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading && (
        <div class="h-screen flex flex-colborder shadow-sm rounded-xl bg-black ">
          <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div class="flex justify-center">
              <div
                class="animate-spin  w-6 h-6 border-[3px] border-current border-t-transparent text-[#00df9a] rounded-full"
                role="status"
                aria-label="loading"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-center" role="status" />
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/UserProfile"
          element={
            <ProtectedRoute>
              <UserProfile />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/ViewCars"
          element={
            <ProtectedRoute>
              <ViewCars />
            </ProtectedRoute>
          }
        />
        <Route
          path="/FullviewCar"
          element={
            <ProtectedRoute>
              {" "}
              <FullviewCar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EditUserprofile"
          element={
            <ProtectedRoute>
              <EditUserprofile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/BookingHistory"
          element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route path="/Otppage" element={<Otppage />} />
        <Route
          path="/Rating"
          element={
            <ProtectedRoute>
              <Rating />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Chats"
          element={
            <ProtectedRoute>
              <Chats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Invoice"
          element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Orders"
          element={
            <ProtectedRoute>
              <CurrentOrders />
            </ProtectedRoute>
          }
        />
        <Route path="/Constacts" element={<Constacts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default UserRoute;
