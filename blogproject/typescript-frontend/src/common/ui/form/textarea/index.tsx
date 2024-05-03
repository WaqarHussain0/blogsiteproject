import React, { HTMLProps } from "react";

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  placeholder?: string;
  labelHtmlFor?: string;
  labelTitle?: string;
  className?: string;
  onChange?: (data?: any) => void;
}

const TextArea = ({
  placeholder,
  id,
  name,
  labelHtmlFor,
  labelTitle,
  className,
  onChange,
  ...restProps
}: TextAreaProps) => {
  return (
    <div className={`${className}`}>
      <label
        htmlFor={labelHtmlFor}
        className="block text-[#242424] text-[14px]"
      >
        {labelTitle}
      </label>
      <textarea
        id={id}
        name={name}
        className="text-[#242424] px-4 w-full h-[300px] text-[16px] outline-none  pb-14 mt-1 block  resize-none"
        onChange={onChange}
        placeholder={placeholder}
        {...restProps}
      />
    </div>
  );
};

export default TextArea;
