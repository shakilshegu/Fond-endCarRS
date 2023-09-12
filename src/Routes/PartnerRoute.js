import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Partner page/HomePage";
import LoginPage from "../pages/Partner page/LoginPage.jsx";
import SignupPage from "../pages/Partner page/signuPage.jsx";
import AddCarform from "../components/Partner/AddCar/AddCarform";
import ViewCar from "../components/Partner/viewCar/ViewCar";
import EditCar from "../components/Partner/EditCar/EditCar";
import FullViewCar from "../components/Partner/FullViewCar/FullViewCar";
import Orders from "../components/Partner/Orders/Orders";
import NotFound from "../404";

import { Toaster } from "react-hot-toast";
import { ProtectedRoutepartner } from "../utils/ProtectedRoute";
import PartnerProfile from "../components/Partner/partnerProfile/partnerProfile.jsx";
import Editprofile from "../components/Partner/EditProfile/Editprofile";

function PartnerRoute() {
  return (
    <>
      <Toaster position="top-center" role="status" />
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedRoutepartner>
              <HomePage />
            </ProtectedRoutepartner>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/addCar" element={<AddCarform />} />
        <Route path="/ViewCar" element={<ViewCar />} />
        <Route path="/PartnerProfile" element={<PartnerProfile />} />
        <Route path="/EditCar" element={<EditCar />} />
        <Route path="/FullViewCar" element={<FullViewCar />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Editprofile" element={<Editprofile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default PartnerRoute;
