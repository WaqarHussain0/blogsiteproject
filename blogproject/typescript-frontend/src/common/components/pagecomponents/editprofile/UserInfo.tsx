import { ChangeEvent, useEffect } from "react";
import Button from "../../../ui/form/button";
import Input from "../../../ui/form/input/Input";
import Row from "../../row";
import image1 from "../../../assests/imgs/waqar.JPG";
import { useState } from "react";
import { userActionCreator } from "../../../redux/actions/user.action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

interface IUserData {
  name: string;
  title: string;
  bio: string;
  profilePic: string;
  email: string;
}
const UserInfo = () => {
  const [userNewData, setUserNewData] = useState([]);

  const [userOwnDetails, setUserOwnDetails] = useState<IUserData>();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserNewData({ ...userNewData, [name]: value });
  };
  const token = localStorage.getItem("Access Token");
  const params = useParams();

  const dataToSend = {
    token,
    userID: params.userID,
  };

  const dataToEdit = {
    userID: params.userID,
    currentUserID: localStorage.getItem("userID"),
    token,
    userNewData,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActionCreator.getUserOwnDetail(dataToSend, setUserOwnDetails));
  }, []);
  const handleOnSaveClick = () => {
    console.log("Save Button Clicked=>", userNewData);
    console.log("### Clicked=>", dataToEdit);
    dispatch(userActionCreator.editUserOwnDetail(dataToEdit));
  };

  return (
    <Row className="flex-col gap-4">
      <Row className="items-center justify-between">
        <div className="flex justify-center items-center w-[70px] h-[70px]  md:w-[100px] md:h-[100px] rounded-full overflow-hidden">
          {userOwnDetails && userOwnDetails.profilePic ? (
            <img
              src={userOwnDetails.profilePic}
              alt="profile pic"
              className="w-full h-full rounded-full object-cover border-2 border-indigo-100"
            />
          ) : (
            <FaUserCircle size={100} />
          )}
        </div>

        <Input
          type="text"
          labelHtmlFor="email"
          labelTitle="Email"
          id="email"
          name="email"
          value={userOwnDetails && userOwnDetails.email}
          onChange={handleOnChange}
          disabled
          className="w-[70%] md:w-[30%]"
        />
      </Row>

      <Input
        type="text"
        labelHtmlFor="name"
        labelTitle="Name"
        id="name"
        name="name"
        value={userOwnDetails && userOwnDetails.name}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        labelHtmlFor="title"
        labelTitle="Title"
        id="title"
        name="title"
        value={userOwnDetails && userOwnDetails.title}
        onChange={handleOnChange}
      />
      <Input
        type="text"
        labelHtmlFor="bio"
        labelTitle="Bio"
        id="bio"
        name="bio"
        value={userOwnDetails && userOwnDetails.bio}
        onChange={handleOnChange}
      />

      <Input
        type="text"
        labelHtmlFor="profilePic"
        labelTitle="Profile URL"
        id="profilePic"
        name="profilePic"
        value={userOwnDetails && userOwnDetails.profilePic}
        onChange={handleOnChange}
      />

      <Row className="flex-row gap-2 justify-end md:gap-4">
        <Button
          btnTitle="Cancel"
          className="bg-slate-500  md:px-0 w-[29%] md:w-[15%] text-white"
        />
        <Button
          btnTitle="Update"
          className="bg-green-600 md:px-0 w-[29%] md:w-[15%] text-white"
          onClick={handleOnSaveClick}
        />
      </Row>
    </Row>
  );
};

export default UserInfo;
