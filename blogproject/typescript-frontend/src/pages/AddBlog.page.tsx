import React, { useEffect, useState } from "react";
import Row from "../common/components/row";
import Button from "../common/ui//form/button";
import TextArea from "../common/ui/form/textarea";
import { IoIosImages } from "react-icons/io";
import { CiSquareRemove } from "react-icons/ci";
import Input from "../common/ui/form/input/Input";
import TopBar from "../common/components/topbar";

import { useDispatch } from "react-redux";
import { userActionCreator } from "../../src/common/redux/actions/user.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
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

  const initialFormData: FormData = {
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
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleSubmit = () => {
    const blogCreatorID = localStorage.getItem("userID");
    if (!blogCreatorID) {
      console.error("User ID not found");
      return;
    }

    const dataToSend = {
      ...formData,
      blogCreatorID,
    };
    dispatch(userActionCreator.addBlog(dataToSend));

    console.log(dataToSend);
  };

  interface ICategory {
    categoryID: string;
    title: string;
  }
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState<ICategory[]>([]);

  const userData = localStorage.getItem("Access Token");
  useEffect(() => {
    dispatch(
      userActionCreator.getCategories(userData, setCategoriesData, setIsLoading)
    );
  }, []);

  console.log(categoriesData);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const selectedCategoryID = e.target.value;
    console.log(selectedCategoryID)
    setFormData({
      ...formData,
      categoryID: selectedCategoryID,
    });
  };

  const handleTagInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = event.currentTarget.value.trim();
      if (newTag !== "" && formData.tags.length < 5) {
        setFormData({
          ...formData,
          tags: [...formData.tags, newTag],
        });
        event.currentTarget.value = "";
      }
    }
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  return (
    <Row className="flex-col gap-4 w-full flex items-center justify-center ">
      <TopBar />
      <ToastContainer
        // className='bg-[#222222] text-white fixed right-0 top-28 text-center px-4'
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
            value={formData.title}
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
            value={formData.coverPic}
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
            value={formData.Pic1}
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
            value={formData.Pic2}
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
            value={formData.Pic3}
          />
        </Row>

        <select
          name="categoryID"
          id="categoryID"
          value={formData.categoryID}
          onChange={handleSelectChange}
          className="text-[#242424] text-[16px] outline-none border-b-[1px] border-black py-1 mt-1 block w-full rounded-sm"
        >
          <option value="">Select Category</option>

          {categoriesData.map((value) => (
            <option key={value.categoryID} value={value.categoryID}>{value.title}</option>
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
            {formData.tags.map((tag, index) => (
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
            ))}
          </Row>
        </Row>

        <Row className="flex-col justify-between border rounded-md h-[370px] relative w-full pt-2">
          <TextArea
            placeholder="Content here "
            id="content"
            name="content"
            onChange={handleInputChange}
            value={formData.content}
          />
          <Row className=" px-4 items-center justify-between w-full absolute right-0 bottom-0 py-2 ">
            <IoIosImages className="text-indigo-600" size={30} />
            <Button
              type="submit"
              btnTitle="Post"
              className="w-[18%] text-center md:w-[10%] bg-indigo-600 text-white"
              onClick={handleSubmit}
            />
          </Row>
        </Row>
      </Row>
    </Row>
  );
};

export default AddBlogPage;
