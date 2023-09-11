import React from 'react'

const Hero = () => {
  return (
    <div className="text-white bg-black">
    <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
      <p className=" text-[#00df9a] font-bold p-2 ">
        GROWING WITH CAR RENTAL SERVICES
      </p>
      <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
      Welcome to Partners
      </h1>
      <p className="md:text-2xl text-xl font-bold text-gray-500">
        Whether you're planning a family vacation, a business trip, or just
        need a stylish ride for a weekend getaway, we've got you covered.
      </p>
      <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3  text-black">
        Get started
      </button>
    </div>
    
  </div>
  )
}

export default Hero
