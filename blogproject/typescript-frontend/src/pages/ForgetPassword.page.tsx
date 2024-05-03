import React from "react";
import Row from "../common/components/row";
import Input from "../common/ui/form/input/Input";
import Button from "../common/ui/form/button";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authActionCreator } from "../../src/common/redux/actions/auth.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ForgetPasswordFormData {
  email: string;
}

const ForgetPasswordPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormData>();

  const dispatch = useDispatch();

  const onSubmit = (data: ForgetPasswordFormData) => {
    dispatch(authActionCreator.userForgetPassword(data));
  };
  

  return (
    <Row className="bg-gray-100 w-full min-h-screen flex items-center justify-center">
      <ToastContainer
        className=" text-gray-800 rounded-lg  absolute right-32 top-20 px-4"
        autoClose={4000}
      />
      <Row className="flex-col justify-center w-full lg:w-[35%] h-[100vh] lg:h-[80vh] bg-white p-14 rounded-lg lg:shadow-md gap-6 lg:gap-4">
        <h2 className="text-2xl text-center  font-bold">Find Your Account</h2>

        <p className="text-center text-[16px] text-[#6b6b6b]">
          Please enter your email address to search for your account.
        </p>

        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <Input
              {...field}
              labelHtmlFor="email"
              labelTitle="Email"
              id="email"
              type="email"
              name="email"
              placeholder="john@gmail.com"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-600 mt-[-20px] md:mt-[-12px] text-[14px]">
            {errors.email.message}
          </p>
        )}

        <Button
          btnTitle="Continue"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="text-white"
        />
      </Row>
    </Row>
  );
};

export default ForgetPasswordPage;
