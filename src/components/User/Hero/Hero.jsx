import React from "react";
import { useNavigate } from "react-router-dom";
import Typed from "react-typed";

function Hero() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex flex-col justify-center sm:py-12 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(/images/Car.jpg)` }}
    >
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className=" text-[#00df9a] font-bold p-2 ">
          GROWING WITH CAR RENTAL SERVICES
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Grow With Us.
        </h1>
        <div className="flex justify-center items-center">
          <p className="md-text-5xl sm:text-4xl text-xl font-bold pl-2 py-4">
            Fast,Flexible for
          </p>
          <p>
            {" "}
            <Typed
              className="md:text-5xl sm:text-4xl text-xl font-bold pl-2 md:pl-4"
              strings={["CarRS", "CarRentalServices"]}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
          </p>
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          Whether you're planning a family vacation, a business trip, or just
          need a stylish ride for a weekend getaway, we've got you covered.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3  text-black"
        >
          Get started
        </button>
      </div>
    </div>
  );
}

export default Hero;
