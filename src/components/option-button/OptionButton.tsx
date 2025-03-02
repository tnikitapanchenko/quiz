import React from "react";
import "./OptionButton.css";

interface OptionButtonProps {
  option: string;
  isSelected: boolean;
  onClick: () => void;
  emoji?: string;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  isSelected,
  onClick,
  emoji,
}) => {
  return (
    <button
      className={`option-btn ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {emoji && <div className="option-emoji">{emoji}</div>}
      <div className="option-text">{option}</div>
    </button>
  );
};

export default OptionButton;
