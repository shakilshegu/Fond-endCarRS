import React,{ useState } from "react";
import Home from "../Home/Home";
import axios from "axios";
import { adminApi } from "../../../Store/Api";
import toast from "react-hot-toast";

const Category = () => {
  const [formData, setFormData] = useState({
    name:""
  });
  const [errors, setErrors] = useState({
    name: "",
  });
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { name  } = formData;
      let isValid = true;
      const newErrors = {
        name: "",
      };
      if (!name.trim()) {
         isValid = false;
        newErrors.name = "category is required";
      }
      
      if (!isValid) {
        setErrors(newErrors);
        return;
      }
      const response = await axios.post(`${adminApi}addcategory`, {
        name: e.target.name.value,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Somthing wrong  ");
    }
  };
  return (
    <div className="flex  ">
      <div className="w-[22%]">
        <Home />
      </div>
      <div className="pt-10 w-full mx-12">
        <h1 className="font-bold text-2xl">ADD Category</h1>
        <form action="" onSubmit={handleLogin} >
          <div class="mb-6">
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="XUV"
              required
            />
            {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
          </div>
          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
         
          <button
            type="submit"
            className= "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Category;
