import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  currentQuestion: number;
  answers: { [key: number]: string | string[] };
  email: string;
}

const initialState: QuizState = {
  currentQuestion: 1,
  answers: {},
  email: "",
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{
        questionId: number;
        answers: string[];
      }>
    ) => {
      state.answers[action.payload.questionId] = action.payload.answers;
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestion = action.payload;
    },
    resetQuiz: (state) => {
      state.currentQuestion = 1;
      state.answers = {};
      state.email = "";
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setAnswer, setCurrentQuestion, resetQuiz, setEmail } =
  quizSlice.actions;
export default quizSlice.reducer;
