import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Container from "../container/Container";
import "./Header.css";

interface HeaderProps {
  totalQuestions: number;
  onBack: () => void;
  hideBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  totalQuestions,
  onBack,
  hideBackButton,
}) => {
  const currentQuestion = useSelector(
    (state: RootState) => state.quiz.currentQuestion
  );
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <header className="header">
      <Container>
        <div className="header-top">
          <button
            onClick={onBack}
            className={`back-btn ${hideBackButton ? "hidden" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="progress-text">
            {currentQuestion}/{totalQuestions}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
