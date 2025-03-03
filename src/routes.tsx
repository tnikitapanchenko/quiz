import { Routes, Route } from "react-router-dom";
import QuizPage from "./pages/quiz/QuizPage";
import EmailPage from "./pages/email/EmailPage";
import ThankYouPage from "./pages/thank-you/ThankYouPage";
import LoaderPage from "./pages/loader/LoaderPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/quiz/:questionId" element={<QuizPage />} />
    <Route path="/email" element={<EmailPage />} />
    <Route path="/loader" element={<LoaderPage />} />
    <Route path="/thank-you" element={<ThankYouPage />} />
    <Route path="*" element={<QuizPage />} />
  </Routes>
);

export default AppRoutes;
