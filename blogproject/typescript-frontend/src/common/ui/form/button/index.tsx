import React, { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnTitle: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({ btnTitle, onClick, type, className }) => {
  return (
    <button
      type={type}
      className={`bg-black py-2 w-full text-[14px] rounded-full ${className}`}
      onClick={onClick}
    >
      {btnTitle}
    </button>
  );
};

export default Button;
