import React, { FC } from "react";
import Row from "../../row";
import Button from "../../../ui/form/button";

interface IFollowerData {
  followersData: Array<{
    name?: string;
    imgSrc?: string;
  }>;
}
const followers: FC<IFollowerData> = ({ followersData }) => {
  return (
    <Row className="flex-col justify-start w-[40%] p-1 md:px-2 ">
      <h2 className="text-[#242424] text-[14px] md:text-[16px] font-medium ">
        Followers
      </h2>
      {followersData.map((user, index) => (
        <Row key={index} className="flex-col">
          <Row className=" justify-between items-center py-2 border-b-[1px] ">
            <Row className="items-center gap-4">
              <img
                src={user.imgSrc}
                alt="profile pic"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
              <h2 className=" text-[13px] text-start font-semibold">
                {user.name}
              </h2>
            </Row>
            <Button
              btnTitle="Follow"
              className=" w-[20%] bg-transparent border-[1px]"
            />
          </Row>
        </Row>
      ))}
    </Row>
  );
};

export default followers;
