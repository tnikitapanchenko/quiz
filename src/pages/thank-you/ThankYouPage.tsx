import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuiz } from "../../store/quizSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import Container from "../../components/container/Container";
import useT from "../../hooks/useT";
import { questions } from "../../data/questions";
import "./ThankYouPage.css";

const ThankYouPage: React.FC = () => {
  const { t } = useT();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { answers, email } = useSelector((state: RootState) => state.quiz);

  const handleRetake = () => {
    dispatch(resetQuiz());
    navigate("/quiz/1");
  };

  const handleDownload = () => {
    const csvRows: string[][] = [];

    // headers
    const csvHeader = ["order", "title", "type", "answer"];
    csvRows.push(csvHeader);

    // add rows with questions/answers
    for (const [qId, ansArray] of Object.entries(answers)) {
      const questionId = Number(qId);
      const question = questions.find((q) => q.id === questionId);
      if (question) {
        csvRows.push([
          questionId.toString(),
          question.title,
          question.type,
          (ansArray as string[]).join("; "),
        ]);
      }
    }

    // add email row
    const emailOrder = (questions.length + 1).toString();
    csvRows.push([emailOrder, "Email", "email", email || ""]);

    const csvContent =
      "\uFEFF" + csvRows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "answers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="thankyou-page">
      <Container>
        <div className="thankyou-content">
          <h2>{t("Thank you for supporting us and passing quiz")}</h2>
          <div className="icon">✅</div>
          <button className="download-btn" onClick={handleDownload}>
            {t("Download my answers")}
          </button>
          <button className="retake-btn" onClick={handleRetake}>
            {t("Retake quiz")}
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ThankYouPage;
