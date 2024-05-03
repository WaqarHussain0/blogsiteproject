import React, { FC, HTMLProps } from "react";

import Row from "../../row";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CiBookmarkPlus } from "react-icons/ci";
import { PiHandsClappingThin } from "react-icons/pi";

import Footer from "../../footer";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "../../../../routes";

interface IRecommendedProps {
  blogs: Array<{
    blogID: string;
    title: string;
    coverPic: string;
    Pic1: string | null;
    Pic2: string | null;
    Pic3: string | null;
    content: string;
    likesCount: number;
    tags: string[];
    createdAt: string;
    blogCreatorID: string;
    categoryID: string;
    User: {
      name: string;
      profilePic: string | null;
    };
  }>;
}

const Recommended: FC<IRecommendedProps> = ({ blogs }) => {
  return (
    <>
      <Row className="flex-col  md:gap-0 md:flex md:flex-row md:flex-wrap md:justify-between  ">
        {blogs.map((blog) => (
          <Link
            to={`${PAGES_ROUTES.blogDetails}/${blog.blogID}`}
            className="flex-row w-full md:w-[32%] "
            key={blog.blogID}
          >
            <Row className="flex-wrap w-full items-start justify-between mb-4   ">
              <div className="w-full h-[250px] ">
                <img
                  src={blog.coverPic}
                  alt="Blog Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <Row className="gap-2 items-center my-2 ">
                <div className="w-[20px] h-[20px] rounded-full overflow-hidden">
                  <img
                    src={blog.User.profilePic || ""}
                    alt="profile pic"
                    className="object-cover"
                  />
                </div>
                <p className="text-[13px] md:text-[14px] text-[#242424]">
                  {blog.User.name}
                </p>
              </Row>

              <Row className="w-full justify-between">
                <Row className="w-full flex-col ">
                  <h2 className=" line-clamp-1 text-[20px] font-bold">
                    {blog.title}
                  </h2>
                  <p className="line-clamp-2 text-justify text-[16px]">
                    {blog.content}
                  </p>
                </Row>
              </Row>

              <Row className="mt-2 justify-between items-center w-full">
                <Row className="gap-4 items-center">
                  <Row className="items-center gap-2">
                    <PiHandsClappingThin size={18} />
                    <h2>{blog.likesCount}</h2>
                  </Row>
                </Row>

                <Row className="gap-4 items-center">
                  <CiBookmarkPlus size={18} />
                  <HiOutlineDotsHorizontal size={18} />
                </Row>
              </Row>
            </Row>
          </Link>
        ))}

        <Footer />
      </Row>
    </>
  );
};

export default Recommended;
