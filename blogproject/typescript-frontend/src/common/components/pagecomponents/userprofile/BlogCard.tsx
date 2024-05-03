import React, { FC, useEffect, useState } from "react";
import Row from "../../row";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa6";
import { PiHandsClappingThin } from "react-icons/pi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CiBookmarkPlus } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "../../../../routes";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaShare } from "react-icons/fa";

import { blogActionCreator } from "../../../redux/actions/blog.action";
import { useDispatch } from "react-redux";
interface IUser {
  name: string;
  profilePic: string;
}

interface IUserBlogProps {
  userData: IUser;
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
  }>;
}
const BlogCard: FC<IUserBlogProps> = ({ blogs, userData }) => {
  const dispatch = useDispatch();

  const handleDeleteBlog = (blogID: string) => {
    const dataToSend = {
      blogID: blogID,
      currentUserID: localStorage.getItem("userID"),
      token: localStorage.getItem("Acess Token"),
    };
    dispatch(blogActionCreator.deleteBlogByID(dataToSend));
  };

  const [isBlogOwner, setIsBlogOwner] = useState(false);

  const checkOwner = () => {
    const currentUserID = localStorage.getItem("userID");
    const blogCreatorID = (blogs && blogs[0])?.blogCreatorID; // Assuming blogs is an array

    if (currentUserID === blogCreatorID) {
      setIsBlogOwner(true);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const checkData = () => {
    blogs ? setIsLoading(false) : setIsLoading(true);
  };
  useEffect(() => {
    checkData();
    blogs && checkOwner();
  });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <>
      {isLoading ? (
        <Row className="w-full px-2 md:w-[80%] flex-col overflow-hidden ">
          <Row className="w-full gap-4 items-center">
            <div className="w-[25px] h-[25px] flex justify-center items-center rounded-full ">
              <Skeleton circle={true} width={"25px"} height={"25px"} />
            </div>
            <Skeleton width={"120px"} height={"25px"} />
          </Row>

          <Row className="items-start justify-between w-full ">
            <div className="flex flex-col w-[67%] md:w-[78%] gap-2 ">
              <Skeleton width={""} height={"30px"} />
              <Skeleton width={""} height={"90px"} />
            </div>
            <div className="w-[30%] h-[90px] md:w-[20%] md:h-[120px]">
              <Skeleton width={"100%"} height={"100%"} />
            </div>
          </Row>

          <Skeleton width={"120px"} height={"25px"} />
          <Row className=" justify-between w-full md:w-[78%] items-center ">
            <Row className="gap-2">
              <Row className="items-center gap-2">
                <PiHandsClappingThin size={20} />
                <Skeleton width={"50px"} height={"25px"} />
              </Row>
              <Row className="items-center gap-2">
                <FaRegComment size={20} />
                <Skeleton width={"50px"} height={"25px"} />
              </Row>
            </Row>

            <Row className="gap-2 items-center">
              <CiBookmarkPlus size={18} />
              <HiOutlineDotsHorizontal size={18} />
            </Row>
          </Row>
        </Row>
      ) : (
        <Row className="w-full md:w-[80%] px-2 flex-col flex-wrap justify-center ">
          {blogs &&
            blogs.map((blog: any, index: any) => (
              <Row
                key={index}
                className="flex-col items-start justify-between mb-4 border-b-[1px] py-2 gap-2 md:gap-4 "
              >
                <Row className="gap-2 items-center">
                  <div className="gap-2 items-center w-[20px] h-[20px]  rounded-full overflow-hidden">
                    {userData.profilePic ? (
                      <img
                        src={userData.profilePic}
                        alt="profile pic"
                        className="object-cover"
                      />
                    ) : (
                      <Row className="w-full h-full rounded-full  justify-center items-center">
                        <FaUserCircle size={20} />
                      </Row>
                    )}
                  </div>
                  {userData.name ? (
                    <p className="text-[13px] text-[#242424]">
                      {userData.name}
                    </p>
                  ) : (
                    <p className="text-[13px] text-[#242424]">John Doe</p>
                  )}
                </Row>

                <Row className="w-full justify-between">
                  <Row className="w-[78%] flex-col gap-2">
                    <Link to={`${PAGES_ROUTES.blogDetails}/${blog.blogID}`}>
                      <h2 className="text-[20px] font-bold line-clamp-2">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="text-[#242424] text-[16px] RegularSourceSerif line-clamp-3">
                      {blog.content}
                    </p>
                  </Row>

                  <div className="w-[80px] h-[53px] md:w-[280px] md:h-[123px] ">
                    <img
                      src={blog.coverPic}
                      alt="Blog Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Row>

                <p className="hidden md:block md:text-[13px]">
                  {formatDate(blog.createdAt)}
                </p>
                <Row className="justify-between items-center w-full md:w-[65%]">
                  <Row className="gap-4">
                    <Row className="items-center gap-4">
                      <PiHandsClappingThin size={20} />
                      <h2 className="text-[#242424] text-[13px]">
                        {blog.likesCount}
                      </h2>
                    </Row>
                  </Row>

                  <Row className="gap-2 items-center text-[#6b6b6b]">
                    {isBlogOwner && (
                      <Row className="gap-2">
                        <MdDelete
                          size={20}
                          // onClick={() => handleDeleteBlog(blog.blogID)}

                          onClick={() => {
                            const confirmed = window.confirm(
                              "Are you sure you want to delete this blog?"
                            );
                            // Check if user confirmed
                            if (confirmed) {
                              handleDeleteBlog(blog.blogID);
                            }
                          }}
                        />

                        <Link to={`${PAGES_ROUTES.editBlog}/${blog.blogID}`}>
                          <FaEdit size={20} />
                        </Link>
                      </Row>
                    )}
                    <FaShare
                      size={20}
                      onClick={() => console.log("Share Clicked")}
                    />
                  </Row>
                </Row>
              </Row>
            ))}
        </Row>
      )}
    </>
  );
};

export default BlogCard;
