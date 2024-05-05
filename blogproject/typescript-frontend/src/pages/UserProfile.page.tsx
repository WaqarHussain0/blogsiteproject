import React, { useEffect, useState } from "react";
import Row from "../common/components/row";
import TopBar from "../common/components/topbar";
import BlogCard from "../common/components/pagecomponents/userprofile/BlogCard";
import About from "../common/components/pagecomponents/userprofile/About";
import { userActionCreator } from "../common/redux/actions/user.action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Following from "../common/components/pagecomponents/userprofile/Following";
import Follower from "../common/components/pagecomponents/userprofile/Followers";

import person from "../common/assests/imgs/person1.png";
import person1 from "../common/assests/imgs/person2.png";
import person2 from "../common/assests/imgs/waqar.JPG";
import Button from "../common/ui/form/button";

const UserProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userPageData, setUserPageData] = useState<any>([]);
  const [isFollowModalOpen, setFollowModalOpen] = useState(false); // State to manage visibility
  const [isFollowerModalOpen, setFollowerModalOpen] = useState(false); // State to manage visibility

  const toggleFollowing = () => {
    setFollowModalOpen(!isFollowModalOpen);
  };
  const toggleFollower = () => {
    setFollowerModalOpen(!isFollowerModalOpen);
  };
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

  const dummyFollowers = [
    {
      name: "Usman Afzaal",
      imgSrc: person,
    },
    {
      name: "Abdullah Ali",
      imgSrc: person1,
    },
    {
      name: "Muneeb Khalid",
      imgSrc: person2,
    },
  ];
  return (
    <Row className="w-full flex-col gap-8 items-center">
      <TopBar />

      <Row className="text-white w-[40%] gap-6">
        <Button btnTitle="Check Followers " onClick={toggleFollower} />
        <Button btnTitle="Check Followings" onClick={toggleFollowing} />
      </Row>
      {isFollowModalOpen && <Following followingsData={dummyFollowers} />}
      {isFollowerModalOpen && <Follower followersData={dummyFollowers} />}
      <Row className="w-full flex-col gap-8 items-center">
        <About userInfo={userDetails} />
        <BlogCard blogs={blogProps} userData={userDataForBlog} />
      </Row>
    </Row>
  );
};

export default UserProfilePage;
