import React from "react";
import { CiEdit, CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import Row from "../row";
import logo from "../../assests/imgs/logo.png";

import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "../../../routes";
import { FaUserCircle } from "react-icons/fa";

const TopBar: React.FC = () => {
  const currentUserImage = localStorage.getItem("User Image");

  const userID = localStorage.getItem("userID");
  return (
    <Row className="w-full items-center mx-auto px-4 md:px-6 py-3 justify-between border-b-[1px]">
      <div className="flex md:justify-between items-center  gap-2 ">
        <Link to={PAGES_ROUTES.home}>
          <img
            src={logo}
            alt="logo"
            className="h-[20px] md:h-[22px] object-cover  "
          />
        </Link>

        <div className="bg-[#f9f9f9] rounded-full flex items-center relative ">
          <CiSearch size={25} className="absolute left-[10px]" />
          <input
            type="text"
            placeholder="Search"
            className="w-[90%] bg-transparent  pl-10 pr-4 py-1 md:py-2 outline-none rounded-full md:w-full "
          />
        </div>
      </div>

      <Row className="gap-4 md:gap-8 items-center">
        <div className="hidden md:flex md:gap-1 md:items-center">
          <CiEdit size={25} />
          <Link to={PAGES_ROUTES.addBlog}>Write</Link>
        </div>

        <Link to={`${PAGES_ROUTES.notification}/${userID}`}>
          <IoMdNotificationsOutline size={25} />
        </Link>

        <div className="w-[32px] h-[32px] rounded-full overflow-hidden border-2 border-indigo-100 ">
          {currentUserImage !== null ? (
            <Link to={`${PAGES_ROUTES.userProfile}/${userID}`}>
              <img
                className="w-full h-full object-cover"
                src={currentUserImage}
                alt="profile pic"
              />
            </Link>
          ) : (
            <Link to={`${PAGES_ROUTES.userProfile}/${userID}`}>
              <FaUserCircle size={28} />
            </Link>
          )}
        </div>
      </Row>
    </Row>
  );
};

export default TopBar;
