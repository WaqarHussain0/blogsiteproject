import React, { FC, HTMLProps, forwardRef } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement> {
    id: string;
    name: string;
    placeholder?: string;
    className?: string;
    type: 'text' | 'number' | 'password' | 'email' | 'file';
}

const InputWithoutLabel: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
    ({ id, name, placeholder, className, type, ...restProps }, ref) => {
        return (
            <div className={`${className}`}>
                <input
                    ref={ref}
                    type={type}
                    id={id}
                    name={name}
                    className={`text-[#242424] text-[16px] pl-3 outline-none border-b-[1px] py-1 mt-1 block w-full rounded-sm  border-l-8 `}
                    placeholder={placeholder}
                    {...restProps}
                />
            </div>
        );
    }
);

export default InputWithoutLabel;
