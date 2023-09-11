import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import { AxiosUser } from "../../../Api/Axiosinstance";
import Footer from "../Footer/Footer";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [data, setData] = useState();
  const [licenseImage, setLicenseImage] = useState(null);

  const usertoken = localStorage.getItem("token");
  const headers = { authorization: usertoken };

  const getData = async () => {
    try {
      const response = await AxiosUser.post(
        `getuserinfobyid`,
        {},
        {
          headers,
        }
      );
      if (response.data.data) {
        setData(response.data.data);
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

  const imageUpload = async () => {
    try {
      const formData = new FormData();
      console.log(licenseImage);
      formData.append("license", licenseImage);

      const response = await AxiosUser.post(`imageUpload`, formData, {
        headers,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const [verificationStatus, setVerificationStatus] = useState("Pending");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLicenseImage(file);
    }
  };

  return (
    <div>
      <Header />
      <div className="mt-5">
        <div className=" max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
          <div className="mb-6">
            <img
              src={data?.image}
              alt="User Photo"
              className="rounded-full h-24 w-24 mx-auto"
            />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold">{data?.name}</h2>
            <p className="text-gray-500">User</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Information</h3>
            <p> {data?.email}</p>
            <p>Phone: (123) 456-7890</p>
          </div>

          {data?.Licence ? (
            <img src={data.Licence} className="w-full" />
          ) : (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">License</h3>

              {licenseImage ? (
                <img
                  src={URL.createObjectURL(licenseImage)}
                  alt="License Photo"
                  className="w-full"
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="mb-2"
                  />
                  <p className="text-gray-500">Upload your license image</p>
                </div>
              )}
              <button
                className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded"
                onClick={imageUpload}
              >
                Upload License
              </button>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Verification</h3>
            <p>Status: {data?.isUser ? "Approved" : "Pending"}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
