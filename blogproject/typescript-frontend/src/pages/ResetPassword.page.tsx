import React from "react";
import Row from "../common/components/row";
import Input from "../common/ui/form/input/Input";
import Button from "../common/ui/form/button";
import { useForm, Controller } from "react-hook-form";

import { useDispatch } from "react-redux";
import { authActionCreator } from "../../src/common/redux/actions/auth.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const ResetPasswordPage: React.FC = () => {

  interface ResetPasswordFormData {
    password: string;
  }
  const params = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const dispatch = useDispatch();

  
  const onSubmit = (data: ResetPasswordFormData) => {
    const dataToSend = {
      password: data.password,
      token: params.token // Include the token as a string
    };
    dispatch(authActionCreator.userResetPassword(dataToSend));
    console.log(dataToSend)
  };

  return (
    <Row className="bg-gray-100 w-full min-h-screen flex items-center justify-center">
      <ToastContainer
        className=" text-gray-800 rounded-lg  absolute right-32 top-20 px-4"
        autoClose={4000}
      />
      <Row className="flex-col justify-center w-full lg:w-[35%] h-[100vh] lg:h-[80vh] bg-white p-14 rounded-lg lg:shadow-md gap-8 lg:gap-4">
        <h2 className="text-2xl text-center  font-bold">Reset Password</h2>

        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <Input
              {...field}
              labelHtmlFor="password"
              labelTitle="Password"
              id="password"
              type="password"
              name="password"
              placeholder="Password here"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-600 text-[14px] mt-[-30px] md:mt-[-12px]">
            {errors.password.message}
          </p>
        )}

        <Button
          type="submit"
          btnTitle="Update"
          onClick={handleSubmit(onSubmit)}
          className="text-white"
        />
      </Row>
    </Row>
  );
};

export default ResetPasswordPage;
