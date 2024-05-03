import React from "react";
import Row from "../common/components/row";
import TopBar from "../common/components/topbar";
import { CiSearch } from "react-icons/ci";
import Footer from "../common/components/footer";

import TechTopics from "../common/components/pagecomponents/exploretopics/TechTopics";
const ExploreTopicPage: React.FC = () => {
  const recommended = [
    "Typescript",
    "Self Improvement",
    "Data Science",
    // "Typescript",
    // "Self Improvement",
    // "Data Science",
    // "Typescript",
  ];

  return (
    <Row className="flex-col justify-center w-full items-center gap-4">
      <TopBar />
      <h2 className="text-[24px] md:text-[42px] text-[#242424] font-semibold">Explore topics</h2>

      <Row className="w-[90%] md:w-[80%] gap-4 items-start justify-center overflow-x-auto ">
        <h2 className="text-[14px] text-[#6b6b6b]">Recommended:</h2>

        {recommended.map((value, index) => (
        <p className="text-[14px] text-[#242424]" key={index}>
            {value}
          </p>
        ))}
      </Row>

      <div className="bg-[#f9f9f9] w-[90%] md:w-[65%] rounded-full flex items-center relative ">
        <CiSearch size={25} className="absolute left-[14px] md:left-[20px]" />
        <input
          type="text"
          placeholder="Search all topics"
          className="text-[#242424] bg-transparent py-2 md:py-4 pl-12 md:pl-14 pr-4  w-full  outline-none rounded-full  "
        />
      </div>

      <div className="w-[90%] md:w-[80%] border-t-[1px] mt-4">
        <TechTopics />
      </div>

      <Footer />
    </Row>
  );
};

export default ExploreTopicPage;
