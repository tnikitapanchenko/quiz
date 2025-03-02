import React, { ButtonHTMLAttributes } from "react";
import "./NextButton.css";

interface NextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const NextButton: React.FC<NextButtonProps> = ({ children, ...props }) => {
  return (
    <button className="next-btn" {...props}>
      {children}
    </button>
  );
};

export default NextButton;
