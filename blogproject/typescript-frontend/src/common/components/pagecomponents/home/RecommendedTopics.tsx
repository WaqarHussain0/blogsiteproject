import React, { useEffect, useState } from "react";
import Row from "../../row";
import { useDispatch } from "react-redux";
import { userActionCreator } from "../../../redux/actions/user.action";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "../../../../routes";
import Skeleton from "react-loading-skeleton";

interface ICategory {
  categoryID: string;
  title: string;
}
const RecommendedTopics: React.FC = () => {
  const [categoriesData, setCategoriesData] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = (): string | null => localStorage.getItem("Access Token");
    const token = getToken();
    const userData = { token };

    if (token) {
      dispatch(
        userActionCreator.getCategories(
          userData,
          setCategoriesData,
          setIsLoading
        )
      );
    } else {
      console.log("ERROR: Access Token not found");
    }
  }, []);

  return (
    <Row className="flex-col flex-wrap justify-center gap-4">
      <h2 className="font-bold  text-[#242424] text-[16px]">
        Recommended Topics
      </h2>

      {isLoading ? (
        <Row className="flex  flex-wrap gap-3">
          <Skeleton width={"120px"} height={"30px"} />
          <Skeleton width={"90px"} height={"30px"} />
          <Skeleton width={"50px"} height={"30px"} />
          <Skeleton width={"90px"} height={"30px"} />
          <Skeleton width={"50px"} height={"30px"} />
          <Skeleton width={"120px"} height={"30px"} />
         
        </Row>
      ) : (
        <Row className="flex  flex-wrap gap-3">
          {categoriesData.map((value) => (
            <p
              key={value.categoryID}
              className="px-4 bg-[#F2F2F2] py-1 gap-3 rounded-full text-center text-[14px] text-[#242424]  capitalize"
            >
              {value.title}
            </p>
          ))}
        </Row>
      )}

      <Link to={PAGES_ROUTES.exploreTopic}>
        <h2 className=" text-[#1A8917] text-[14px]">See more topics</h2>
      </Link>
    </Row>
  );
};

export default RecommendedTopics;
