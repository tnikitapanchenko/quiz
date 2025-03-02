import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import useT from "../../hooks/useT";
import "./LoaderPage.css";

const LoaderPage: React.FC = () => {
  const { t } = useT();
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 5000;
    const intervalTime = 50;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const newProgress = Math.min((step / totalSteps) * 100, 100);
      setProgress(newProgress);
      if (newProgress >= 100) {
        clearInterval(interval);
        navigate("/thank-you");
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [navigate]);

  const progressDeg = progress * 3.6;

  return (
    <div className="loader-page">
      <Container>
        <div className="loader-content">
          <div className="loader-circle">
            <div
              className="loader-ring"
              style={
                { "--progressDeg": `${progressDeg}deg` } as React.CSSProperties
              }
            />
            <div className="loader-inner-text">{Math.round(progress)}%</div>
          </div>
          <p className="loader-text">{t("Finding collections for you...")}</p>
        </div>
      </Container>
    </div>
  );
};

export default LoaderPage;
