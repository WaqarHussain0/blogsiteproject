import React, { useEffect, useState } from "react";
import Row from "../common/components/row";
import TopBar from "../common/components/topbar";
import waqar from "../common/assests/imgs/waqar.JPG";
import person1 from "../common/assests/imgs/person1.png";
import person2 from "../common/assests/imgs/person2.png";
import person3 from "../common/assests/imgs/person3.png";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { userActionCreator } from "../../src/common/redux/actions/user.action";
import { useParams } from "react-router-dom";
const HomePage: React.FC = () => {
  const dummyData = [
    {
      name: "Waqar Hussain",
      type: "like",
      title: "Roadmap to become a Flutter Developer",
      imgSrc: waqar,
      seen: false,
    },

    {
      name: "Usman Afzal",
      type: "comment",
      title: "How to join PieCyfer?",
      imgSrc: person1,
      seen: true,
    },
    {
      name: "Abdullah Ali",
      type: "like",
      title: "How to join PieCyfer?",
      imgSrc: person2,
      seen: true,
    },

    {
      name: "Areeb Ahsan",
      type: "like",
      title: "How to join PieCyfer?",
      imgSrc: person3,
      seen: false,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [notificationData, setNotificationData] = useState(true);
  const unseenNotifications = dummyData.filter((val) => !val.seen);
  const seenNotifications = dummyData.filter((val) => val.seen);

  const allNotifications = [...unseenNotifications, ...seenNotifications];

  const param = useParams();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const getToken = (): string | null => localStorage.getItem("Access Token");
  //   const token = getToken();
  //   const userData = { token };

  //   if (token) {
  //     dispatch(
  //       userActionCreator.getBasicInfo(userData, setUserBasicData, setIsLoading)
  //     );
  //   } else {
  //     console.log("ERROR: Access Token not found");
  //   }
  // }, [dispatch]);
  const token = localStorage.getItem("Access Token");

  useEffect(() => {
    const dataToSend = {
      userID: param.userID,
      token: token,
    };
    console.log("Data from FRONTEND", dataToSend);

    if (token) {
      dispatch(
        userActionCreator.viewNotification(
          dataToSend,
          setNotificationData,
          setIsLoading
        )
      );
    } else {
      console.log("ERROR: Access Token not found");
    }
  });
  return (
    <Row className="w-full flex-col md:gap-8 items-center">
      <TopBar />

      {isLoading ? (
        <Row className="w-full  md:w-[80%]  flex-col  items-center  mt-2 md:mt-0">
          {[...Array(4)].map((_, index) => (
            <Row
            key={index}
              className={`w-full justify-between p-2 md:p-4 border-b-[1px]  `}
            >
              <Row className="w-full gap-3  items-center">
                <div className="  w-[32px] h-[32px]  rounded-full ">
                  <Skeleton circle={true} width={"100%"} height={"100%"} />
                </div>

                <div className=" flex-col  w-[85%] md:w-[95%]">
                  <Skeleton width={"70%"} height={"30px"} />
                  <Skeleton width={"100%"} height={"30px"} />
                </div>
              </Row>
            </Row>
          ))}
        </Row>
      ) : (
        <Row className="w-full  md:w-[80%]  flex-col  items-center  mt-2 md:mt-0">
          {allNotifications.map((val) => (
            <Row
              className={`w-full justify-between p-2 md:p-4 border-b-[1px]  ${
                val.seen ? "bg-slate-50" : "bg-slate-200"
              }`}
            >
              <Row className=" gap-3  items-center">
                <div className="  w-[32px] h-[32px]  rounded-full overflow-hidden">
                  <img
                    src={val.imgSrc}
                    alt="Profile Pic"
                    className=" w-full h-full  object-cover "
                  />
                </div>

                <div className="flex-col ">
                  <p className="line-clamp-1">
                    {val.seen ? "" : "New"} {val.type} by {val.name} on blog
                  </p>
                  <p className="line-clamp-1">{val.title}</p>
                </div>
              </Row>
            </Row>
          ))}
        </Row>
      )}
    </Row>
  );
};

export default HomePage;
