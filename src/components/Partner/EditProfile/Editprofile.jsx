import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { AxiosPartner } from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";

const Editprofile = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    location: [],
  });
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const partnerToken = localStorage.getItem("partnerToken");
  const headers = { authorization: partnerToken };
  const getData = async () => {
    try {
      const response = await AxiosPartner.post(
        `getpartnerinfobyid`,
        {},
        {
          headers,
        }
      );
      if (response.data.success) {
        setData(response.data.data);
        console.log(response.data.data);
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editpartner = async (e) => {
    try {
      e.preventDefault();
      const response = await AxiosPartner.post(
        `editpartnerprofile`,
        {
          name: data.name,
          email: data.email,
          location: data.location,
        },
        {
          headers,
        }
      );

      if (response.data.success) {
        toast.success("Profile Updated Successfully");
        navigate("/partner/PartnerProfile");
      }
    } catch (error) {
      toast.error("Something Went Wrong " + error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="pt-16 bg-blueGray-50 relative">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <h1 className="text-center text-3xl font-semibold">Edit Profile</h1>
          <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-2">
            <form action="" onSubmit={editpartner}>
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      <img
                        alt="Profile"
                        src={data?.image}
                        className="shadow-xl rounded-full h-auto align-middle border-none w-40 ml-11"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="mt-2"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <input
                    type="text"
                    className="text-xl font-semibold leading-normal text-blueGray-700 mb-2"
                    placeholder="Name"
                    value={data?.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    <input
                      type="email"
                      className="text-sm leading-normal text-blueGray-400 font-bold uppercase"
                      placeholder="Email"
                      value={data?.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    <input
                      type="text"
                      className="text-sm leading-normal text-blueGray-400 font-bold"
                      placeholder="Edit Locations"
                      value={data?.location}
                      onChange={(e) =>
                        setData({
                          ...data,
                          locations: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    University of Computer Science
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      </p>
                      <button
                        type="submit"
                        className=" items-center justify-center  bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Editprofile;
