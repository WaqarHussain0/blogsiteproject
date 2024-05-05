import React from "react";

import Row from "../common/components/row";
import TopBar from "../common/components/pagecomponents/welcome/TopBar";
import Header from "../common/components/pagecomponents/welcome/Header";
import Trending from "../common/components/pagecomponents/welcome/Trending";
import Footer from "../common/components/footer"
const WelcomePage: React.FC = () => {
  return (
    <Row className="w-full flex-col items-center ">

      <div className="px-[10%] flex-col bg-[#FFC017] py-4 justify-center w-full items-center border-b-[1px] border-black">
        <TopBar />
      </div>

      <div className="px-[10%] flex-col bg-[#FFC017] py-4 justify-center w-full items-center border-b-[1px] border-black">
        <Header />
      </div>

      <div className=" w-full px-[8px] md:px-[10%]  py-10 justify-center md:w-full md:items-center border-b-[1px]">
        <Trending />
      </div>

      <Footer />
    </Row>
  );
};

export default WelcomePage;