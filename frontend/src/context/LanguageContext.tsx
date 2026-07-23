import { createContext, useContext, useState, ReactNode } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "English",
  setLanguage: () => {},
});

export const LanguageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [language, setLanguage] = useState("English");

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);