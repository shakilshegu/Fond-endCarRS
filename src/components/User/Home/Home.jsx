import React from "react";
import Car from "../../../assets/Bmw.png";

function Home() {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="max-auto w-[450px] " src={Car} alt="car" />
        <div className="flex flex-col justify-center">
          <p className="text-[#00df9a] font-bold ">About Us</p>
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Welcome to car rent service
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas nam
            eaque unde voluptate velit? Maxime totam vel, ducimus excepturi nemo
            assumenda iusto quod deleniti numquam, alias quis aliquam atque ut!
          </p>
          <button className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
