import React, { useEffect, useState } from "react";
import Row from "../../row";
import person1 from "../../../assests/imgs/person2.png";
import { useDispatch } from "react-redux";
import { userActionCreator } from "../../../redux/actions/user.action";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "../../../../routes";
import { FaUserCircle } from "react-icons/fa";

type User = {
  userID: string;
  title: string;
  name: string;
  profilePic?: string;
};

const WhoToFollow: React.FC = () => {
  const [basicData, setUserBasicData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const handleOnClick = () => {
    const followerId = localStorage.getItem("userID");
    const token = localStorage.getItem("Access Token");
    const dataToSend = { userId: "f", token, followerId };
    console.log("####", dataToSend);

    if (token) {
      dispatch(userActionCreator.followUser(dataToSend));
    } else {
      console.log("ERROR: Access Token not found");
    }
  };

  useEffect(() => {
    const getToken = (): string | null => localStorage.getItem("Access Token");
    const token = getToken();
    const userData = { token };

    if (token) {
      dispatch(
        userActionCreator.getBasicInfo(userData, setUserBasicData, setIsLoading)
      );
    } else {
      console.log("ERROR: Access Token not found");
    }
  }, [dispatch]);

  return (
    <Row className="flex-col justify-start  ">
      <h2 className="font-bold mb-4 text-[#242424] text-[16px]">
        Who to follow
      </h2>

      {isLoading
        ? [...Array(3)].map((_, index) => (
            <Row
              key={index}
              className="items-center justify-between mb-2  w-full "
            >
              <div className=" w-[25px] h-[25px] lg:w-[35px] lg:h-[35px]  ">
                <Skeleton circle={true} width={"100%"} height={"100%"} />
              </div>
              <Row className="items-center justify-between w-[85%] ">
                <div className="flex flex-col w-[68%]  overflow-hidden ">
                  <Skeleton width={"130px"} height={"30px"} />
                  <Skeleton width={"220px"} height={"46px"} />
                </div>

                <div className="flex flex-col w-[29%]  ">
                  <Skeleton width={"100%"} height={"30px"} />
                </div>
              </Row>
            </Row>
          ))
        : basicData.map((user, index) => (
            <Row
              key={index}
              className="max:h-[320px] mb-4 overflow-y-auto items-center justify-between "
            >
              <div className="w-[32px] h-[32px] rounded-full overflow-hidden border-2 border-indigo-100">
                {user.profilePic ? (
                  <img
                    src={user.profilePic ? user.profilePic : person1}
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Row className="w-full h-full rounded-full  justify-center items-center">
                    <FaUserCircle size={28} />
                  </Row>
                )}
              </div>
              <Row className="items-center justify-between w-[85%]">
                <div className="flex flex-col">
                  <Link
                    className="w-full"
                    to={`${PAGES_ROUTES.userProfile}/${user.userID}`}
                    key={index}
                  >
                    <h2 className="font-medium text-[#242424] text-[16px] ">
                      {user.name}
                    </h2>
                  </Link>
                  <p className="line-clamp-2 text-[#6b6b6b] text-[13px]">
                    {user.title}
                  </p>
                </div>
                <button
                  onClick={handleOnClick}
                  className="px-4 py-1 border-[2px] rounded-full text-center text-[13px] text-black"
                >
                  Follow
                </button>
              </Row>
            </Row>
          ))}
      <Link to={PAGES_ROUTES.home}>
        <h2 className=" text-[#1A8917] text-[14px]">See all users</h2>
      </Link>
    </Row>
  );
};

export default WhoToFollow;
