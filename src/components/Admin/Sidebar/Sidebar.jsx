import React from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../../../assets/dummy-data/navLinks"

const Sidebar = () => {
  return (
    <div className="sidebar w-72 h-screen fixed top-0 left-0 z-50 bg-primary px-8">
      <div className="sidebar__top h-16 flex items-center">
        <h2 className="text-heading flex items-center space-x-2">
          <span className="w-8 h-8 flex items-center justify-center bg-secondary rounded-full">
            <i className="ri-taxi-line text-heading"></i>
          </span>{" "}
          UberX
        </h2>
      </div>

      <div className="sidebar__content flex flex-col justify-between h-95%">
        <div className="menu h-80%">
          <ul className="nav__list flex flex-col space-y-8 text-smallText">
            {navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  activeClassName="nav__active"
                  className="nav__link flex items-center space-x-2 px-6 py-1 rounded-md"
                >
                  <i className={`${item.icon} text-secondary`}></i>
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__bottom h-20%">
          <span className="flex items-center space-x-2 cursor-pointer text-smallText">
            <i className="ri-logout-circle-r-line"></i> Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
