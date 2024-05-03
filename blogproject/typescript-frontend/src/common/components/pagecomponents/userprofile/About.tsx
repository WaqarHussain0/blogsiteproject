import React, { FC, useEffect, useState } from "react";
import Row from "../../row";
import { userActionCreator } from "../../../redux/actions/user.action";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "../../../../routes";

interface IUserInfoProps {
  userInfo: {
    userID?: string;
    name?: string;
    title?: string;
    bio?: string;
    profilePic?: string;
    totalFollower?: number;
    blogCount?: number;
    detailsAreLoading?: boolean;
  };
}

const About: FC<IUserInfoProps> = ({ userInfo }) => {
  const dispatch = useDispatch();
  const [isAccountOwner, setIsAccountOwner] = useState(false);

  const checkOwner = () => {
    const currentUserID = localStorage.getItem("userID");
    if (currentUserID === userInfo.userID) {
      setIsAccountOwner(true);
    }
  };
  useEffect(() => {
    checkOwner();
  });

  const handleFollowClick = () => {
   
    const dataToSend = {
      token:localStorage.getItem("Access Token"),
      followerId:localStorage.getItem("userID"),
      userId:userInfo.userID,
    };
    dispatch(userActionCreator.followUser(dataToSend));
  };

  return (
    <>
      {userInfo.detailsAreLoading ? (
        <Row className="px-2 flex-col items-start  w-full md:w-[80%] gap-2 overflow-hidden">
          <Row className="w-full justify-between">
            <div className="w-[70px] h-[70px]  md:w-[80px] md:h-[80px]   ">
              <Skeleton circle={true} width={"100%"} height={"100%"} />
            </div>

            <Row className="gap-2 md:gap-6">
              <Row className="flex-col items-center">
                <Skeleton width={"60px"} height={"30px"} />
                <p>blogs</p>
              </Row>

              <Row className="flex-col items-center">
                <Skeleton width={"60px"} height={"30px"} />
                <p>followers</p>
              </Row>

              <Row className="flex-col items-center">
                <Skeleton width={"60px"} height={"30px"} />
                <p>following</p>
              </Row>
            </Row>
          </Row>

          <div className="flex gap-2 md:gap-6 ">
            <Skeleton width={"120px"} height={"30px"} />
            <Skeleton width={"160px"} height={"30px"} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Skeleton width={""} height={"70px"} />

            <Skeleton width={""} height={"40px"} />
            <Skeleton width={""} height={"40px"} />
          </div>
        </Row>
      ) : (
        <Row className="w-full md:w-[80%] px-2 flex-col justify-center gap-2 ">
          <div className="w-full flex md:gap-4 justify-between items-center">
            <div className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden  ">
              {userInfo.profilePic ? (
                <img
                  src={userInfo.profilePic}
                  alt="profile pic"
                  className="object-cover"
                />
              ) : (
                <Row className="w-full h-full rounded-full  justify-center items-center">
                  <FaUserCircle size={70} />
                </Row>
              )}
            </div>

            <Row className=" gap-10 w-[80%]  justify-end  ">
              <Row className="flex-col items-center">
                <h2 className="font-bold text-[24px]">{userInfo.blogCount}</h2>
                <p>blogs</p>
              </Row>

              <Row className="flex-col items-center">
                <h2 className="font-bold text-[24px]">
                  {userInfo.totalFollower}
                </h2>
                <p>followers</p>
              </Row>

              <Row className="flex-col items-center">
                <h2 className="font-bold text-[24px]">33</h2>
                <p>!followings</p>
              </Row>
            </Row>
          </div>

          <Row className="gap-2 items-center">
            <h2 className="text-[#191919] text-[16px] md:text-[22px] font-semibold text-start ">
              {userInfo.name}
            </h2>
            <p className="text-[#191919] text-[14px] md:text-[16px] text-start ">
              {userInfo.title}
            </p>
          </Row>
          <p className="text-[#6b6b6b] text-[12px] md:text-[16px] text-start ">
            {userInfo.bio}
          </p>

          {isAccountOwner ? (
            <Link
              to={`${PAGES_ROUTES.editProfile}/${userInfo.userID}`}
              className="bg-[#1A8917] text-white text-[14px] w-full text-center py-2 rounded-sm "
            >
              Edit Profile
            </Link>
          ) : (
            <p
              onClick={handleFollowClick}
              className="bg-[#1A8917] text-white text-[14px] w-full text-center py-2 rounded-sm "
            >
              Follow
            </p>
          )}

          <p className="border-2  text-[14px] w-full text-center py-2 rounded-sm ">
            Blogs by {userInfo.name}
          </p>
        </Row>
      )}
    </>
  );
};

export default About;
