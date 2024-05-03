import React from "react";
import Row from "../../row";
import { FaArrowTrendUp } from "react-icons/fa6";
import { PAGES_ROUTES } from "../../../../routes";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <Row className=" items-center  justify-between text-center  border-[2px]  ">
      <p className="cursor-pointer  text-[14px] bg-[#f2f2f2] w-[49%] py-3 border-r-2">
        All Blogs
      </p>

      <Link to={PAGES_ROUTES.exploreTopic}
         className="flex items-center justify-center w-[49%] gap-2 text-[#6b6b6b]">
          <p className="cursor-pointer  text-[14px]  py-3">Explore Topics</p>
          <FaArrowTrendUp />
      </Link>
    </Row>
  );
};

export default Category;
