import React from "react";

import Row from "../common/components/row";
import { Link } from "react-router-dom";
import { PAGES_ROUTES } from "../routes";
import Input from "../common/ui/form/input/Input";
import GoogleButton from "../common/ui/form/button/GoogleButton";
import Button from "../common/ui/form/button/";
import { useForm, Controller } from "react-hook-form";

import { useDispatch } from "react-redux";
import { authActionCreator } from "../../src/common/redux/actions/auth.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  interface SignUpFormData {
    name: string;
    email: string;
    password: string;
  }
  // const onSubmit = (data: SignUpFormData) => console.log("Login Data =>", data);
  const onSubmit = (data: SignUpFormData) => {
    dispatch(authActionCreator.userSignUp(data));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  return (
    <Row className="bg-gray-100 w-full min-h-screen flex items-center justify-center">
      <ToastContainer
        // className='bg-[#222222] text-white fixed right-0 top-28 text-center px-4'
        className=" text-gray-800 rounded-lg  absolute right-32 top-20 px-4"
        autoClose={4000}
      />
      <Row className="flex-col justify-center w-full lg:w-[35%] h-[100vh] lg:h-[80vh] bg-white p-14 rounded-lg lg:shadow-md gap-6 lg:gap-4">
        <h2 className="text-2xl text-center  font-bold">Join BlogSite</h2>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <Input
              {...field}
              labelTitle="Name"
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              labelHtmlFor="name"
            />
          )}
        />
        {errors.name && (
          <p className="text-red-600 mt-[-22px] md:mt-[-14px] text-[14px]">
            {errors.name.message}
          </p>
        )}

        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <Input
              {...field}
              labelTitle="Email"
              labelHtmlFor="email"
              id="email"
              type="email"
              name="email"
              placeholder="john@gmail.com"
            />
          )}
        />
        {errors.email && (
          <p className="text-red-600 mt-[-22px] md:mt-[-14px] text-[14px]">
            {errors.email.message}
          </p>
        )}

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
          <p className="text-red-600 text-[14px] mt-[-22px] md:mt-[-14px]">
            {errors.password.message}
          </p>
        )}

        <Button
          btnTitle="Sign Up"
          type="submit"
          onClick={handleSubmit(onSubmit)}

          className="text-white"
        />

        <GoogleButton btnTitle="Sign Up with Google" />

        <p className="text-[16px] text-[#242424] text-center">
          Already have an account?{" "}
          <Link
            to={PAGES_ROUTES.login}
            className="text-[#1A8917] text-[16px]  font-bold"
          >
            Log in
          </Link>
        </p>

        <p className="text-center text-[13px] text-[#6b6b6b]">
          This site is protected by reCAPTCHA Enterprise and the Google Privacy
          Policy and Terms of Service apply.
        </p>
      </Row>
    </Row>
  );
};

export default SignUpPage;
