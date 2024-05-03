import React from "react";
import Row from "../common/components/row";
import TopBar from "../common/components/topbar";
import Categories from "../common/components/pagecomponents/home/Category";
import RecommendedTopics from "../common/components/pagecomponents/home/RecommendedTopics";
import WhoToFollow from "../common/components/pagecomponents/home/WhoToFollow";
import BlogCard from "../common/components/pagecomponents/home/BlogCard";

const HomePage: React.FC = () => {
  return (
    <Row className="w-full flex-col md:gap-8 items-center">
      <TopBar />
      <Row className="w-full md:w-[80%] justify-between">
        <Row className="w-full  px-4 flex-col gap-4 md:w-[67%] md:pr-4 ">
          <Categories />
          <BlogCard />
        </Row>

        <Row className="hidden md:flex md:w-[33%] md:flex-col md:gap-8 pl-4 md:border-l-[1px]">
          <RecommendedTopics />
          <WhoToFollow />
        </Row>
      </Row>
    </Row>
  );
};

export default HomePage;
