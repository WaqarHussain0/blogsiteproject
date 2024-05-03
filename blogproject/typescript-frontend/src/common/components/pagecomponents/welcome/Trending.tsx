import React from "react";
import Row from "../../row";
import { IoIosTrendingUp } from "react-icons/io";
import image from "../../../assests/imgs/person1.png";
import image1 from "../../../assests/imgs/person2.png";
import image2 from "../../../assests/imgs/person3.png";


interface TrendingCardProps {
    name: string;
    imgSrc: string;
    title: string;
    date: string;
    number: string;
  }
const TrendingCard: React.FC<TrendingCardProps> = ({ name, imgSrc, title, date, number }) => {
  return (
    <Row className="gap-4 w-full  md:w-[32%]">
      <h2 className="text-[32px] text-[#f2f2f2]">{number}</h2>

      <Row className=" flex-col gap-2">
        <Row className="items-center gap-2">
          <img
            src={imgSrc}
            alt="avator"
            className="w-[20px] h-[20px] rounded-full"
          />
          <h2 className="text-[13px] text-[#242424] font-medium ">{name}</h2>
        </Row>
        <h2 className="text-[#242424] text-[16px] font-bold">{title}</h2>

        <p className="text-[#6b6b6b] text-[13px]">{date}</p>
      </Row>
    </Row>
  );
};
const Trending: React.FC = () => {
  return (
    <Row className="flex-col gap-8">
      <Row className="gap-2 items-center">
        <div className="border border-black rounded-full h-[19px] w-[19px]">
          <IoIosTrendingUp />
        </div>
        <h2 className="text-[16px] text-[#242424] font-medium">
          Trending on Medium
        </h2>
      </Row>

      <Row className="flex-col gap-8 md:flex-row md:items-start md:justify-between  ">
        <TrendingCard
          name={"Usman Afzaal"}
          imgSrc={image}
          title="How to Use Python Built-In Decoration to Improve Performance
        Significantly"
          date={"Apr 12, 2023"}
          number={"01"}
        />

        <TrendingCard
          name={"Abdullah Ali"}
          imgSrc={image1}
          title="Think Slow"
          date={"May 2, 2023"}
          number={"02"}
        />

        <TrendingCard
          name={"Muneeb Khalid"}
          imgSrc={image2}
          title="AGI is Not Possible"
          date={"Oct 28, 2023"}
          number={"03"}
        />
      </Row>

      <Row className=" flex-col gap-8 md:flex-row md:items-start md:justify-between  ">
        <TrendingCard
          name={"Waqar Hussain"}
          imgSrc={image2}
          title="Welcome To The Emergency Room, Your Stay Will Be Unforgettable"
          date={"Jul 2, 2022s"}
          number={"04"}
        />

        <TrendingCard
          name={"Saad Arif"}
          imgSrc={image}
          title="America’s Unhappy Teenagers Have The Same Problems We Do"
          date={"May 2, 2023"}
          number={"05"}
        />

        <TrendingCard
          name={"Areeb Ahsan"}
          imgSrc={image1}
          title="He Sparked Outrage at Our Toddler Gymnastics Class"
          date={"Oct 28, 2023"}
          number={"06"}
        />
      </Row>
    </Row>
  );
};

export default Trending;