import { useTranslation } from "react-i18next";

const useT = () => {
  const { t, i18n } = useTranslation();
  const typedT = t as (key: string, options?: Record<string, any>) => string;
  return { t: typedT, i18n };
};

export default useT;
