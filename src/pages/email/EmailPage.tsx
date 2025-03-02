import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Container from "../../components/container/Container";
import "./EmailPage.css";
import useT from "../../hooks/useT";
import NextButton from "../../components/next-button/NextButton";
import { setEmail } from "../../store/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

interface EmailFormInputs {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const EmailPage: React.FC = () => {
  const { t } = useT();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storedEmail = useSelector((state: RootState) => state.quiz.email);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<EmailFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { email: storedEmail },
  });

  useEffect(() => {
    setValue("email", storedEmail);
  }, [storedEmail, setValue]);

  const onSubmit = (data: EmailFormInputs) => {
    dispatch(setEmail(data.email));
    navigate("/loader");
  };

  return (
    <div className="email-page">
      <Container>
        <div className="email-content">
          <h2>{t("Email")}</h2>
          <p>{t("Enter your email to get full access")}</p>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <input
              type="email"
              placeholder={t("Your email")}
              {...register("email")}
              className={`email-input ${errors.email ? "error" : ""}`}
            />
            {errors.email && (
              <div className="error-text">{errors.email.message}</div>
            )}
            <NextButton type="submit" disabled={!isValid}>
              {t("Next")}
            </NextButton>
          </form>
          <p className="terms">
            {t("By continuing I agree with")}{" "}
            <a href="#!">{t("Privacy policy")}</a> {t("and")}{" "}
            <a href="#!">{t("Terms of use")}</a>.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default EmailPage;
