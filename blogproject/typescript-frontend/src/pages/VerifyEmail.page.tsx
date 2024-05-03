import React from "react";
import Row from "../common/components/row";
import Button from "../common/ui/form/button";
import { useDispatch } from "react-redux";
import { authActionCreator } from "../common/redux/actions/auth.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const VerifyEmailPage: React.FC = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const onSubmit = () => {
    const data = {
      userID: params.userID,
    };
    dispatch(authActionCreator.userVerifyEmail(data));
  };

  return (
    <Row className="bg-gray-100 w-full min-h-screen flex items-center justify-center">
      <ToastContainer
        className=" text-gray-800 rounded-lg  absolute right-32 top-20 px-4"
        autoClose={4000}
      />
      <Row className="flex-col justify-center w-full lg:w-[35%] h-[100vh] lg:h-[80vh] bg-white p-14 rounded-lg lg:shadow-md gap-6 lg:gap-4">
        <h2 className="text-2xl text-center  font-bold">Verify Your Email</h2>

        <Button
          btnTitle="Verify"
          type="submit"
          onClick={onSubmit}
          className="text-white"
        />
      </Row>
    </Row>
  );
};

export default VerifyEmailPage;
