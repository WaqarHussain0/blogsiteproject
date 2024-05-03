import React from "react";
import { PAGES_ROUTES } from "../../../../routes";
import { Link } from "react-router-dom";
import Row from "../../row";

function Header() {
  return (
    <Row className="justify-center ">
      <div className="flex flex-col gap-4 h-[462px] justify-center text-center">
        <h2 className="text-[70px] md:text-[106px]">Stay curious.</h2>
        <p className="text-[20px]  text-[#242424]">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>

        <Link to={PAGES_ROUTES.signup} className="text-[20px]  py-2 text-white bg-black rounded-full">
        Start Reading
        </Link>
      </div>

     
    </Row>
  );
}

export default Header;