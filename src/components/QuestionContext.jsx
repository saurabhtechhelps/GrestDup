import { createContext, useContext, useState } from "react";

const QuestionContext = createContext();

export const useQuestionContext = () => {
  return useContext(QuestionContext);
};

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  return (
    <QuestionContext.Provider
      value={{ questions, setQuestions, answers, setAnswers }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
