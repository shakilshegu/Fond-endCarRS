import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Partner/Navbar/Navbar";
import { AxiosPartner } from "../../../Api/Axiosinstance";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const AddCarfrom = () => {
  const navigate = useNavigate();
  const { useState } = React;
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  const partnerToken = localStorage.getItem("partnerToken");
  const headers = {
    authorization: partnerToken,
    "Content-Type": "multipart/form-data",
  };
  const [imageFile, setImageFile] = useState(null);
  const [category, setcategory] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    year: "",
    color: "",
    mileage: "",
    price: "",
    description: "",
    category: "",
    location: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    brand: "",
    year: "",
    color: "",
    mileage: "",
    price: "",
    description: "",
    category: "",
    location: "",
  });
  const getData = async () => {
    try {
      const response = await AxiosPartner(`getCategory`);
      if (response.data.success) {
        setcategory(response.data.category);
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

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setMessage("");
    let file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([...files, file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };

  const handleInputChange = async (e) => {
 
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("brand", e.target.brand.value);
      formData.append("year", e.target.year.value);
      formData.append("mileage", e.target.mileage.value);
      formData.append("price", e.target.price.value);
      formData.append("description", e.target.description.value);
      formData.append("category", e.target.category.value);
      formData.append("color", e.target.color.value);
      formData.append("location", e.target.location.value);
      formData.append("carNo", e.target.carNo.value);

      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }
      const response = await AxiosPartner.post(`addCarpost`, formData, {
        headers,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirected to addCar page");
        navigate("/partner/ViewCar");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="  ">
      <Navbar />
      <div className="w-[100%]  flex justify-center px-5 py-8">
        <div className="w-[50%] px-5 py-8 rounded-lg border-4 bg-black">
          <h1 className=" font-extrabold text-[#00df9a]">ADD CAR</h1>
          <form action="" onSubmit={handleInputChange} >
            <div className="relative z-0 w-full mb-6 group mt-2">
              <input
                type="name"
                name="name"
                value={formData.name}
                id="floating_email"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="brand"
                name="brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand}</p>
              )}

              <label
                for="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Brand
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <select
                name="category"
                id="floating_category"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option className="bg-black" value="">
                  Select a category
                </option>
                {category.map((cat) => (
                  <option className="bg-black" key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <label
                for="floating_repeat_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Category
              </label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="Number"
                  name="year"
                  id="floating_first_name"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                {errors.year && (
                  <p className="text-red-500 text-sm">{errors.year}</p>
                )}

                <label
                  for="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Year
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                {errors.color && (
                  <p className="text-red-500 text-sm">{errors.color}</p>
                )}

                <label
                  for="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  color
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="mileage"
                  value={formData.mileage}
                  onChange={(e) =>
                    setFormData({ ...formData, mileage: e.target.value })
                  }
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                {errors.mileage && (
                  <p className="text-red-500 text-sm">{errors.mileage}</p>
                )}
                <label
                  for="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  mileage
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="Number"
                  name="price"
                  id="floating_company"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="floating_company"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Price per hour
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="description"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  description
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="Number"
                  name="carNo"
                  id="floating_first_name"
                  value={formData.carNo}
                  onChange={(e) =>
                    setFormData({ ...formData, carNo: e.target.value })
                  }
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                {errors.year && (
                  <p className="text-red-500 text-sm">{errors.year}</p>
                )}

                <label
                  for="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Car No
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="location"
                  id="floating_phone"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="floating_phone"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Location
                </label>
              </div>
            </div>
            <div class="flex justify-center px-3">
              <div class="rounded-lg shadow-xl bg-gray-50  w-[360px]">
                <div class="m-4">
                  <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
                    {message}
                  </span>
                  <div class="flex items-center justify-center w-full">
                    <label class="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                      <div class="flex flex-col items-center justify-center pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Select a photo
                        </p>
                      </div>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        class="opacity-0"
                        multiple="multiple"
                        name="files[]"
                      />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {files.map((file, key) => {
                      return (
                        <div key={key} className="overflow-hidden relative">
                          <i
                            onClick={() => {
                              removeImage(file.name);
                            }}
                            className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                          ></i>
                          <img
                            className="h-20 w-20 rounded-md"
                            src={URL.createObjectURL(file)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#00df9a] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCarfrom;
