import React, { ChangeEvent, useEffect, useState } from "react";
import Row from "../common/components/row";
import Button from "../common/ui/form/button";
import TextArea from "../common/ui/form/textarea";
import { IoIosImages } from "react-icons/io";
import { CiSquareRemove } from "react-icons/ci";
import Input from "../common/ui/form/input/Input";
import TopBar from "../common/components/topbar";
import { useDispatch } from "react-redux";
import { userActionCreator } from "../common/redux/actions/user.action";
import { blogActionCreator } from "../common/redux/actions/blog.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

interface BlogData {
  title: string;
  coverPic: string;
  Pic1: string;
  Pic2: string;
  Pic3: string;
  categoryID: string;
  tags: string[];
  content: string;
  blogCreatorID: string;
}
const AddBlogPage: React.FC = () => {
  const dispatch = useDispatch();

  const initialBlogData: BlogData = {
    title: "",
    coverPic: "",
    Pic1: "",
    Pic2: "",
    Pic3: "",
    categoryID: "",
    tags: [],
    content: "",
    blogCreatorID: "",
  };

  const [blogData, setBlogData] = useState<BlogData>(initialBlogData);
  const [isLoading, setIsLoading] = useState();
  const [blogNewData, setBlogNewData] = useState<Partial<BlogData>>({});

  interface ICategory {
    categoryID: string;
    title: string;
  }
  const [categoriesData, setCategoriesData] = useState<ICategory[]>([]);

  const params = useParams();

  const getPreviousData = () => {
    const dataToSend = {
      blogID: params.blogID,
      token: localStorage.getItem("Access Token"),
    };
    dispatch(blogActionCreator.getBlogByID(dataToSend, setBlogData));
  };

  const getAllCategories = () => {
    dispatch(
      userActionCreator.getCategories(
        localStorage.getItem("Access Token"),
        setCategoriesData,
        setIsLoading
      )
    );
  };
  useEffect(() => {
    getPreviousData();
    getAllCategories();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlogNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateBlog = () => {
    const dataToSend = {
      blogID: params.blogID,
      userID: localStorage.getItem("userID"),
      token: localStorage.getItem("Access Token"),
      blogNewData
    };
    dispatch(blogActionCreator.editBlog(dataToSend));
    console.log(dataToSend);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryID = e.target.value;
    setBlogNewData((prevData) => ({
      ...prevData,
      categoryID: selectedCategoryID,
    }));
  };

  const handleTagInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = event.currentTarget.value.trim();
      if (
        newTag !== "" &&
        (blogData.tags.length || 0) + (blogNewData?.tags?.length || 0) < 5
      ) {
        setBlogNewData((prevData) => ({
          ...prevData,
          tags: [...(prevData.tags || []), newTag],
        }));
        event.currentTarget.value = "";
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setBlogData((prevData) => ({
      ...prevData,
      tags: prevData.tags?.filter((tag) => tag !== tagToRemove),
    }));
  };
  return (
    <Row className="flex-col gap-4 w-full flex items-center justify-center ">
      <TopBar />
      <ToastContainer
        className=" text-gray-800 rounded-lg  absolute right-32 top-20 px-4"
        autoClose={4000}
      />
      <Row className=" flex-col justify-center items-center  w-full  p-4 md:p-10  gap-8 lg:gap-4  ">
        <Row className="w-full gap-6">
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="Title here"
            className="w-full"
            labelHtmlFor="title"
            labelTitle="Title"
            onChange={handleInputChange}
            value={blogNewData.title || blogData.title}
          />
        </Row>

        <Row className="w-full gap-2">
          <Input
            id="coverPic"
            type="text"
            name="coverPic"
            placeholder="Paste image link here"
            className="w-full"
            labelHtmlFor="coverPic"
            labelTitle="Cover Pic"
            onChange={handleInputChange}
            value={blogNewData.coverPic || blogData.coverPic}
          />
          <Input
            id="Pic1"
            type="text"
            name="Pic1"
            placeholder="Paste image link here"
            className="w-full"
            labelHtmlFor="Pic1"
            labelTitle="Pic1"
            onChange={handleInputChange}
            value={blogNewData.Pic1 || blogData.Pic1}
          />

          <Input
            id="Pic2"
            type="text"
            name="Pic2"
            placeholder="Paste image link here"
            className="w-full"
            labelHtmlFor="Pic2"
            labelTitle="Pic2"
            onChange={handleInputChange}
            value={blogNewData.Pic2 || blogData.Pic2}
          />

          <Input
            id="Pic3"
            type="text"
            name="Pic3"
            placeholder="Paste image link here"
            className="w-full"
            labelHtmlFor="Pic3"
            labelTitle="Pic3"
            onChange={handleInputChange}
            value={blogNewData.Pic3 || blogData.Pic3}
          />
        </Row>

        <select
          name="categoryID"
          id="categoryID"
          value={blogNewData.categoryID || blogData.categoryID}
          onChange={handleSelectChange}
          className="text-[#242424] text-[16px] outline-none border-b-[1px] border-black py-1 mt-1 block w-full rounded-sm"
        >
          <option value="">Select Category</option>

          {categoriesData.map((value) => (
            <option key={value.categoryID} value={value.categoryID}>
              {value.title}
            </option>
          ))}
        </select>

        <Row className="w-full gap-4 flex-col">
          <input
            type="text"
            onKeyPress={handleTagInputKeyPress}
            placeholder="Enter tags and press Enter button"
            className={`text-[#242424] text-[16px] outline-none border-b-[1px] py-1 mt-1 block w-full rounded-sm border-black `}
          />
          <Row className="gap-1 items-center flex-wrap ">
            {[...(blogData.tags || []), ...(blogNewData.tags || [])].map(
              (tag, index) => (
                <Row
                  key={index}
                  className="px-2 py-[1px] items-center bg-slate-200"
                >
                  <span>{tag}</span>
                  <CiSquareRemove
                    className="pl-2 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                    size={30}
                  />
                </Row>
              )
            )}
          </Row>
        </Row>

        <Row className="flex-col justify-between border rounded-md max:h-[370px] relative w-full pt-2">
          <TextArea
            placeholder="Content here "
            id="content"
            name="content"
            onChange={handleInputChange}
            value={blogNewData.content || blogData.content}
          />
          <Row className="justify-end pr-4  w-full absolute right-0 bottom-0 py-2 ">
            <Button
              type="submit"
              btnTitle="Update"
              className="w-[18%] text-center md:w-[10%] bg-green-600 text-white"
              onClick={updateBlog}
            />
          </Row>
        </Row>
      </Row>
    </Row>
  );
};

export default AddBlogPage;
