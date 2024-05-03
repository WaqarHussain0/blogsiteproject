import React, { useEffect, useState } from "react";
import Row from "../common/components/row";
import TopBar from "../common/components/topbar";
import WrittenBy from "../common/components/pagecomponents/blogdetails//WrittenBy";
import Recommended from "../common/components/pagecomponents/blogdetails/Recommended";
import { useDispatch } from "react-redux";
import { blogActionCreator } from "../common/redux/actions/blog.action";
import { userActionCreator } from "../common/redux/actions/user.action";
import { useParams } from "react-router-dom";
import { PiHandsClappingThin } from "react-icons/pi";

interface IBlogData {
  title: string;
  coverPic?: string;
  content: string;
  Pic1?: string;
  Pic2?: string;
  Pic3?: string;
  likesCount?: number;
  User: {
    name: string;
    profilePic: string;
    title: string;
  };
}
const BlogDetailsPage: React.FC = () => {
  const dispatch = useDispatch();
  const getToken = localStorage.getItem("Access Token");
  const { blogID } = useParams();

  const [blogData, setBlogData] = useState<IBlogData | undefined>();
  const [recommendedBlogData, setRecommendedBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dataToSend = {
    blogID: blogID,
    token: getToken,
  };

  const handleLikeButton = () => {
    console.log("Like button clicked");
    dispatch(userActionCreator.likeBlog(dataToSend));
  };

  useEffect(() => {
    dispatch(
      blogActionCreator.getBlog(
        localStorage.getItem("Access Token"),
        setIsLoading,
        setRecommendedBlogData
      )
    );
  }, []);

  useEffect(() => {
    dispatch(blogActionCreator.getBlogByID(dataToSend, setBlogData));
  }, [blogID]);

  const blogOwnerName = blogData?.User.name;
  const blogOwnerImg = blogData?.User.profilePic;
  const blogOwnerTitle = blogData?.User.title;

  return (
    <Row className="flex-col justify-center w-full items-center">
      <TopBar />
      <Row className="flex-col w-full px-4 md:px-4 md:w-[80%] md:mt-8 gap-8 ">
        {blogData && (
          <h2 className="md:text-[40px] font-bold">{blogData.title}</h2>
        )}
        {blogData && (
          <img
            src={blogData.coverPic}
            alt="coverPic"
            className="h-[218px] md:h-[600px] object-cover"
          />
        )}
        {blogData && (
          <p className="text-justify text-[18x] text-[#242424]">
            {" "}
            {blogData.content}
          </p>
        )}

        <Row className="justify-between">
          {blogData && (
            <img
              src={blogData.Pic1}
              alt="pic1"
              className="h-[218px] md:h-[400px]  w-[33%] object-cover"
            />
          )}

          {blogData && (
            <img
              src={blogData.Pic2}
              alt="pic2"
              className="h-[218px] md:h-[400px]  w-[33%] object-cover"
            />
          )}

          {blogData && (
            <img
              src={blogData.Pic3}
              alt="pic3"
              className="h-[218px] md:h-[400px]  w-[33%] object-cover"
            />
          )}
        </Row>

        <Row className="items-center gap-2">
          <PiHandsClappingThin size={20} onClick={handleLikeButton} />
          {blogData && <h2>{blogData.likesCount}</h2>}
        </Row>
      </Row>

      <Row className="w-full flex-col bg-slate-100 items-center">
        <Row className="flex-col w-full px-4 md:px-4 md:w-[80%] mt-4 md:mt-14 gap-4 ">
          <WrittenBy
            blogOwnerTitle={blogOwnerTitle}
            blogOwnerImg={blogOwnerImg}
            blogOwnerName={blogOwnerName}
          />
          <h2 className="text-[20px] text-[#242424]">
            Recommended from Medium
          </h2>
          <Recommended blogs={recommendedBlogData} />
        </Row>
      </Row>
    </Row>
  );
};

export default BlogDetailsPage;
