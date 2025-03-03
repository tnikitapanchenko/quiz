import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { questions } from "../../data/questions";
import { setAnswer, setCurrentQuestion } from "../../store/quizSlice";
import { setLanguage } from "../../store/languageSlice";
import Header from "../../components/header/Header";
import Container from "../../components/container/Container";
import OptionButton from "../../components/option-button/OptionButton";
import NextButton from "../../components/next-button/NextButton";
import i18n from "../../i18n";
import useT from "../../hooks/useT";
import "./QuizPage.css";

const languageOptions: Record<string, string> = {
  English: "en",
  French: "fr",
  German: "de",
  Spanish: "es",
};

const emojiMap: Record<string, string> = {
  Werewolf: "🐺",
  Action: "🔥",
  "Royal Obsession": "👑",
  Billionaire: "💰",
  Romance: "❤️",
  "Young Adult": "👩‍🦰",
  "Bad Boy": "😈",
};

const QuizPage: React.FC = () => {
  const { t } = useT();
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentQuestionId = Number(questionId);
  const totalQuestions = questions.length;
  const quizState = useSelector((state: RootState) => state.quiz);

  const question = useMemo(
    () => questions.find((q) => q.id === currentQuestionId),
    [currentQuestionId]
  );
  const translatedTitle = t(`question.${question?.id}.title`, {
    defaultValue: question?.title || "",
  });
  const translatedSubtitle = t(`question.${question?.id}.subtitle`, {
    defaultValue: question?.subtitle || "",
  });
  const hideBackButton = currentQuestionId === 1 || currentQuestionId === 2;

  useEffect(() => {
    if (!question) {
      navigate(`/quiz/${quizState.currentQuestion}`);
    } else {
      dispatch(setCurrentQuestion(currentQuestionId));
    }
  }, [
    currentQuestionId,
    question,
    dispatch,
    quizState.currentQuestion,
    navigate,
  ]);

  if (!question) return null;

  const selectedAnswers = quizState.answers[question.id] || [];

  const handleBack = () => {
    if (currentQuestionId > 1) {
      navigate(`/quiz/${currentQuestionId - 1}`);
    }
  };

  const handleSelectOption = (option: string) => {
    if (question.id === 1) {
      const langCode = languageOptions[option] || "en";
      dispatch(setLanguage(langCode));
      i18n.changeLanguage(langCode);
    }
    if (question.type === "single") {
      dispatch(setAnswer({ questionId: question.id, answers: [option] }));
    } else {
      const maxSelect = question.maxSelect || question.options.length;
      const existing = Array.isArray(selectedAnswers)
        ? selectedAnswers
        : selectedAnswers
        ? [selectedAnswers]
        : [];
      let newAnswers = [...existing];
      if (newAnswers.includes(option)) {
        newAnswers = newAnswers.filter((a) => a !== option);
      } else {
        if (newAnswers.length < maxSelect) {
          newAnswers.push(option);
        }
      }
      dispatch(setAnswer({ questionId: question.id, answers: newAnswers }));
    }
  };

  const handleNext = () => {
    if (currentQuestionId < totalQuestions) {
      navigate(`/quiz/${currentQuestionId + 1}`);
    } else {
      navigate("/email");
    }
  };

  return (
    <div className="quiz-page">
      <Header
        totalQuestions={totalQuestions}
        onBack={handleBack}
        hideBackButton={hideBackButton}
      />
      <Container>
        <div className="quiz-content">
          <h2>{translatedTitle}</h2>
          {question.subtitle && <p>{translatedSubtitle}</p>}
          <div
            className={`options ${
              currentQuestionId === 5 ? "bubble-options" : ""
            }`}
          >
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers.includes(option);
              const translatedOption = t(
                `question.${question.id}.options.${index}`,
                {
                  defaultValue: option,
                }
              );
              const emoji =
                currentQuestionId === 5 ? emojiMap[option] || "" : "";
              return (
                <OptionButton
                  key={option}
                  option={translatedOption}
                  isSelected={isSelected}
                  onClick={() => handleSelectOption(option)}
                  emoji={emoji}
                />
              );
            })}
          </div>
          <NextButton
            className="next-btn"
            onClick={handleNext}
            disabled={selectedAnswers.length === 0}
          >
            {t("Next")}
          </NextButton>
        </div>
      </Container>
    </div>
  );
};

export default QuizPage;
