import React, { useEffect, useState } from "react";
import Row from "../common/components/row";
import TopBar from "../common/components/topbar";
import BlogCard from "../common/components/pagecomponents/userprofile/BlogCard";
import About from "../common/components/pagecomponents/userprofile/About";
import { userActionCreator } from "../common/redux/actions/user.action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userPageData, setUserPageData] = useState<any>([]);

  const params = useParams();

  const dispatch = useDispatch();

  const userPageDataFunction = () => {
    const token = localStorage.getItem("Access Token");
    const dataToSend = { userID: params.userID, token };

    if (token) {
      dispatch(
        userActionCreator.viewUserPage(
          dataToSend,
          setUserPageData,
          setIsLoading
        )
      );
    } else {
      console.log("ERROR: Access Token not found");
    }
  };
  useEffect(userPageDataFunction, []);

  const userDetails = {
    userID: userPageData?.userID,
    name: userPageData?.name,
    title: userPageData?.title,
    bio: userPageData?.bio,
    profilePic: userPageData?.profilePic,
    blogCount: userPageData.blogs ? userPageData.blogs.length : 0,
    totalFollower: userPageData.followers ? userPageData.followers.length : 0,
    detailsAreLoading: isLoading,
  };

  const userDataForBlog = {
    name: userDetails.name,
    profilePic: userDetails.profilePic,
  };
  const blogProps = userPageData.blogs;

  return (
    <Row className="w-full flex-col gap-8 items-center">
      <TopBar />

      <Row className="w-full flex-col gap-8 items-center">
        <About userInfo={userDetails} />
        <BlogCard blogs={blogProps} userData={userDataForBlog} />
      </Row>
    </Row>
  );
};

export default UserProfilePage;
