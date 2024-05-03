import React, { ReactNode, HTMLAttributes } from "react";

interface RowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Row = ({ children, className, ...restProps }: RowProps) => {
  return (
    <div className={`flex ${className}`} {...restProps}>
      {children}
    </div>
  );
};

export default Row;
