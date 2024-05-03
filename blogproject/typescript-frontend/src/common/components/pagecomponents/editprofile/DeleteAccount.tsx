import { useDispatch } from "react-redux";
import Button from "../../../ui/form/button";
import Row from "../../row";
import { userActionCreator } from "../../../redux/actions/user.action";
import { useParams } from "react-router-dom";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const handleDeleteAccount = () => {
    console.log("hi");
    const dataToSend = {
      token: localStorage.getItem("Access Token"),
      userID: params.userID,
    };

    dispatch(userActionCreator.deleteAccount(dataToSend));
  };
  return (
    <Row className="w-full flex-col gap-4">
      <Row className="w-full flex-col">
        <Button
          btnTitle="Delete all blogs"
          className="bg-transparent text-[#c94a4a]  px-0 md:w-[18%] text-start mt-0 py-0"
        />
        <p className="text-[13px] text-[#6b6b6b]">
          Permanently delete all of your content.
        </p>
      </Row>
      <Row className="w-full flex-col">
        <Button
          btnTitle="Delete account"
          onClick={handleDeleteAccount}
          className="bg-transparent text-[#c94a4a] px-0 md:w-[18%] text-start mt-0 py-0"
        />
        <p className="text-[13px] text-[#6b6b6b]">
          Permanently delete your account.
        </p>
      </Row>
    </Row>
  );
};

export default DeleteAccount;
