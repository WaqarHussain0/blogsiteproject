import React from "react";
import Row from "../../row";
import person from "../../../assests/imgs/person1.png";
import person1 from "../../../assests/imgs/person2.png";
import person2 from "../../../assests/imgs/person3.png";

const Following: React.FC = () => {
  const dummyUsers = [
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
    <Row className="flex-col justify-start h-[70px] overflow-y-scroll w-full p-1 md:px-2  md:border ">
      <h2 className="text-[#242424] text-[14px] md:text-[16px] font-medium ">Following</h2>
      {dummyUsers.map((user, index) => (
        <Row key={index} className="flex-col">
          <Row className="  items-center mb-2">
            <Row className="items-center  justify-between  w-full">
              <img
                src={user.imgSrc}
                alt="profile pic"
                className="w-[20px] h-[20px]"
              />
              <h2 className="text-[#6b6b6b] text-[13px] text-start">
                {user.name}
              </h2>
            </Row>
          </Row>
        </Row>
      ))}
    </Row>
  );
};

export default Following;
