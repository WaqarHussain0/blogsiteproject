import React from "react";
import Row from "../../row";
import image1 from "../../../assests/imgs/fulllogo.png";
import { PAGES_ROUTES } from "../../../../routes";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <Row className="justify-between items-center ">
      <img
        src={image1}
        alt="logo here"
        className="h-6 md:h-8 lg:h-12 object-contain"
      />
      <div className="flex gap-4 lg:gap-12 items-center cursor-pointer  lg:text-base">
        <Link to={PAGES_ROUTES.login}>
          <p className="hidden md:flex"> Sign in</p>
        </Link>

        <Link to={PAGES_ROUTES.signup}>
          <p className="px-4 lg:px-5 py-2 text-white bg-black rounded-full">
            Get Started
          </p>
        </Link>
      </div>
    </Row>
  );
};

export default TopBar;