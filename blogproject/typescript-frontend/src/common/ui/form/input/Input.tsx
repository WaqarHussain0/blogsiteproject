import React, { FC, HTMLProps, forwardRef } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  labelHtmlFor: string;
  labelTitle: string;
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  type?: string;
  value?:string,
  onChange?: (data?: any) => void;
}

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      labelTitle,
      labelHtmlFor,
      id,
      name,
      placeholder,
      className,
      onChange,
      value,
      type,
      ...restProps
    },
    ref
  ) => {
    return (
      <div className={`${className}`}>
        <label
          htmlFor={labelHtmlFor}
          className="block text-[#242424] text-[14px]"
        >
          {labelTitle}
        </label>
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`text-[#242424] text-[16px] outline-none border-b-[1px] py-1 mt-1 block w-full rounded-sm border-black `}
          placeholder={placeholder}
          {...restProps}
        />
      </div>
    );
  }
);

export default Input;
