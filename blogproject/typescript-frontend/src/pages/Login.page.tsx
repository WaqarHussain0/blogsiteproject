import React from "react";
import Row from "../common/components/row";
import { PAGES_ROUTES } from "../routes";
import { Link } from "react-router-dom";
import Input from "../common/ui/form/input/Input";
import GoogleButton from "../common/ui/form/button/GoogleButton";
import Button from "../common/ui/form/button";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authActionCreator } from "../../src/common/redux/actions/auth.action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const dispatch = useDispatch();
  const onSubmit = (data: LoginFormData) => {
    dispatch(authActionCreator.userSignIn(data));
  };


  return (
    <Row className="bg-gray-100 w-full min-h-screen flex items-center justify-center">
      <ToastContainer
        className=" text-gray-800 rounded-lg  absolute right-32 top-20 px-4"
        autoClose={4000}
      />
      <Row className="flex-col justify-center w-full lg:w-[35%] h-[100vh] lg:h-[80vh] bg-white p-14 rounded-lg lg:shadow-md gap-8 lg:gap-4">
        <h2 className="text-2xl text-center  font-bold">Login</h2>
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
          <p className="text-red-600 mt-[-30px] md:mt-[-12px] text-[14px]">
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
          <p className="text-red-600 text-[14px] mt-[-30px] md:mt-[-12px]">
            {errors.password.message}
          </p>
        )}

        <Button
          type="submit"
          btnTitle="Login"
          onClick={handleSubmit(onSubmit)}
          className="text-white"
        />

        <GoogleButton btnTitle=" Sign Up with Google" />

        <p className="text-[16px] text-[#242424] text-center">
          Don't have an account?{" "}
          <Link
            to={PAGES_ROUTES.signup}
            className="text-[#1A8917] text-[16px]  font-bold"
          >
            Create one
          </Link>
        </p>

        <Link
          to={PAGES_ROUTES.forgetPassword}
          className="text-center text-[16px] text-[#6b6b6b]"
        >
          Forgot password?
        </Link>
      </Row>
    </Row>
  );
};

export default LoginPage;
