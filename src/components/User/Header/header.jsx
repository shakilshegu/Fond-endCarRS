import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {AxiosUser} from "../../../Api/Axiosinstance"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Header = () => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [data, setData] = useState();

  const usertoken = localStorage.getItem("token");
  const headers = { authorization: usertoken };

  const HandleNav = () => {
    setNav(!nav);
  };

  const getData = async () => {
    try {
      const response = await AxiosUser.post(
        `getuserinfobyid`,
        {},
        {
          headers
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const loginsellerClick = () => {
    navigate("partner/login")
  }

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <div className=" bg-black">
       <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">CarRS</h1>
      <ul className="hidden md:flex  cursor-pointer  ">
        <li className="p-4" onClick={() => navigate('/')}>Home</li>
        <li className="p-4" onClick={() => navigate('/ViewCars')}>Cars</li>
        <li className="p-4">Contacts</li>
         {data?( 
         <Menu as="div" className="relative inline-block text-left">
         <div>
           <Menu.Button className="inline-flex  h-[50px] mt-[2.6] w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm">
             {data.name}
             <ChevronDownIcon className="-mr-1 h-5 w-5 text-white-400" aria-hidden="true" />
           </Menu.Button>
         </div>
         <Transition
           as={Fragment}
           enter="transition ease-out duration-100"
           enterFrom="transform opacity-0 scale-95"
           enterTo="transform opacity-100 scale-100"
           leave="transition ease-in duration-75"
           leaveFrom="transform opacity-100 scale-100"
           leaveTo="transform opacity-0 scale-95"
         >
           <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
             <div className="py-1">
               <Menu.Item>
                 {({ active }) => (
                   <i
                     href="#"
                     onClick={() => navigate('/UserProfile')} 
                     className={classNames(
                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                       'block px-4 py-2 text-sm'
                     )}
                   >
                     Profile
                   </i>
                 )}
               </Menu.Item>
               <Menu.Item>
                 {({ active }) => (
                   <i
                     href="#"
                     onClick={() => navigate('/BookingHistory')} 
                     className={classNames(
                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                       'block px-4 py-2 text-sm'
                     )}
                   >
                     Booking History
                   </i>
                 )}
               </Menu.Item>
               <Menu.Item>
                 {({ active }) => (
                   <i
                     href="#"
                     className={classNames(
                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                       'block px-4 py-2 text-sm'
                     )}
                   >
                     License
                   </i>
                 )}
               </Menu.Item>
               <form method="POST" action="#">
                 <Menu.Item>
                   {({ active }) => (
                     <i
                      onClick={handleLogout}
                       type="submit"
                       className={classNames(
                         active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                         'block w-full px-4 py-2 text-left text-sm'
                       )}
                     >
                       Sign out
                     </i>
                   )}
                 </Menu.Item>
               </form>
             </div>
           </Menu.Items>
         </Transition>
       </Menu>
          ):( <button
          onClick={handleLoginClick}
          className="bg-[#fbfbfb] w-[100px] rounded-md font-bold h-[40px] mt-2  text-black"
        >
          Login
        </button>)}
       
        <button  onClick={loginsellerClick}
         className="bg-[#fbfbfb] w-[100px] ml-5 rounded-md font-bold h-[40px] mt-2  text-black">
           Partner
        </button>
      </ul>
      <div onClick={HandleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">CarRS</h1>
        <ul className="uppercase p-4">
          <li className="p-4 border-b border-gray-600">Home</li>
          <li className="p-4 border-b  border-gray-600">Cars</li>
          <li className="p-4 border-b  border-gray-600">About</li>
          <li className="p-4 border-b  border-gray-600">Contacts</li>
          <li className="p-4">Places</li>
          <button className="bg-[#fbfbfb] w-[100px] rounded-md font-bold h-[40px] mt-2  text-black">
            Login
          </button>
        </ul>
      </div>
    </div>
    </div>
   
  );
};

export default Header;





<Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <i
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </i>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <i
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </i>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <i
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </i>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
