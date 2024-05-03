import Row from "../../row";
import person2 from "../../../assests/imgs/person2.png";
import { GoPersonAdd } from "react-icons/go";

import React, { FC, HTMLProps } from "react";

interface IWrittenByProps extends HTMLProps<HTMLInputElement> {
  blogOwnerName?: string;
  blogOwnerImg?: string;
  blogOwnerTitle?: string;
}
const WrittenBy: FC<IWrittenByProps> = ({
  blogOwnerName,
  blogOwnerImg,
  blogOwnerTitle,
}) => {
  return (
    <Row className="flex-col py-4 gap-4 items-start justify-between w-full border-b-2 ">
      <div className="w-[90px] h-[90px] overflow-hidden rounded-full">
        <img src={blogOwnerImg} alt="profile pic" className="object-cover" />
      </div>
      <Row className="justify-between items-start w-full">
        <div className="flex-col gap-2 items-center text-[#242424] ">
          <h2 className="font-semibold text-[16px] md:text-[24px]">
            Blog by {blogOwnerName}
          </h2>
        </div>
        <div className="flex gap-2 items-center">
          <button className="bg-[#156D12] text-white rounded-full px-4 py-1">
            Follow
          </button>
          <div className="flex items-center justify-center bg-[#156D12] text-white rounded-full w-[30px] h-[30px]">
            <GoPersonAdd size={18} className="" />
          </div>
        </div>
      </Row>
      <p className="">{blogOwnerTitle}</p>
    </Row>
  );
};

export default WrittenBy;
