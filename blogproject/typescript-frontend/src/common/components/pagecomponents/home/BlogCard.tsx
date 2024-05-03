import React, { useEffect, useState } from "react";
import Row from "../../row";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CiCircleMinus, CiBookmarkPlus } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { blogActionCreator } from "../../../redux/actions/blog.action";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "../../../../routes";
import Skeleton from "react-loading-skeleton";

// Define a type to represent the structure of a blog
type Blog = {
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
};

const BlogCard: React.FC = () => {
  interface UserData {
    token: string;
  }

  const [isLoading, setIsLoading] = useState(true);

  const [blogs, setBlogData] = useState<Blog[]>([]); // Local state to store blog data
  const dispatch = useDispatch();

  const getToken = (): string | null => localStorage.getItem("Access Token");

  useEffect(() => {
    const token = getToken();
    if (token) {
      const userData: UserData = { token };
      dispatch(blogActionCreator.getBlog(userData, setIsLoading, setBlogData));
    } else {
      console.error("Access Token not found in localStorage");
    }
  }, [dispatch]);

  const blogData = useSelector((state: any) => state.BlogReducer.data);

  useEffect(() => {}, [blogData]);

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
    <Row className="flex-col flex-wrap justify-center gap-2">
      {isLoading
        ? [...Array(3)].map((_, index) => (
            <Row
              key={index}
              className="w-full overflow-hidden flex-col border-b-[1px] py-2 gap-2 mb-4"
            >
              <Row className="w-full gap-4 items-center">
                <div className="w-[25px] h-[25px]  rounded-full overflow-hidden">
                  <Skeleton
                    className="flex items-center justify-center"
                    circle={true}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>

                <div className="flex gap-2 w-full ">
                  <Skeleton width={"120px"} height={"25px"} />
                  <Skeleton width={"90px"} height={"25px"} />
                </div>
              </Row>

              <Row className="items-start justify-between w-full ">
                <div className="flex flex-col  w-[67%] md:w-[78%] gap-2">
                  <Skeleton width={""} height={"30px"} />
                  <Skeleton width={""} height={"46px"} />
                </div>
                <div className=" w-[30%] md:w-[20%]  h-[90px] md:h-[120px]  ">
                  <Skeleton width={"100%"} height={"100%"} />
                </div>
              </Row>

              <Row className=" justify-between md:w-[79%] items-center ">
                <div className="flex w-full gap-2">
                  <Skeleton width={"90px"} height={"25px"} />
                  <Skeleton width={"90px"} height={"25px"} />
                </div>

                <Row className="gap-2 items-center">
                  <CiBookmarkPlus size={18} />
                  <CiCircleMinus size={18} />
                  <HiOutlineDotsHorizontal size={18} />
                </Row>
              </Row>
            </Row>
          ))
        : blogs &&
          blogs.map((blog, index: number) => (
            <Link
              className="w-full"
              to={`${PAGES_ROUTES.blogDetails}/${blog.blogID}`}
              key={index}
            >
              <Row className="flex-col items-start justify-between mb-4 border-b-[1px] py-2  gap-2">
                <Row className="gap-2 items-center ">
                  {blog.User.profilePic ? (
                    <img
                      src={blog.User.profilePic}
                      alt="profile pic"
                      className="w-[25px] h-[25px] rounded-full object-cover border-2 border-indigo-100"
                    />
                  ) : (
                    <Row className="w-[20px] h-[20px] rounded-full  justify-center items-center">
                      <FaUserCircle size={20} />
                    </Row>
                  )}

                  <p className="text-[14px] text-[#242424]">{blog.User.name}</p>

                  <p className="text-[14px] text-[#6b6b6b]">
                    {formatDate(blog.createdAt)}
                  </p>
                </Row>

                <Row className="w-full justify-between">
                  <Row className="w-[78%] flex-col gap-2">
                    <h2 className="text-[#242424] text-[16px] font-semibold">
                      {blog.title}
                    </h2>
                    <p className="hidden md:line-clamp-3 md:text-justify">
                      {blog.content}
                    </p>
                  </Row>

                  <div className="md:w-[20%] w-[80px] h-[56px] md:h-[120px] bg-black">
                    <img
                      src={blog.coverPic}
                      alt="Blog Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Row>

                <Row className="justify-between items-center w-full md:w-[80%]">
                  <Row className="gap-2 flex-wrap">
                    {blog.tags.map((val, index) => (
                      <p
                        key={index}
                        className="px-2 bg-[#F2F2F2] text-[#242424] text-[13px] rounded-full"
                      >
                        {val}
                      </p>
                    ))}
                  </Row>

                  <Row className="gap-2 items-center">
                    <CiBookmarkPlus size={18} />
                    <CiCircleMinus size={18} />
                    <HiOutlineDotsHorizontal size={18} />
                  </Row>
                </Row>
              </Row>
            </Link>
          ))}
    </Row>
  );
};

export default BlogCard;
