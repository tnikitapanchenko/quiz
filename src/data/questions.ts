import { Question } from "../types";

export const questions: Question[] = [
  {
    id: 1,
    title: "What is your preferred language?",
    subtitle: "Choose language",
    type: "single",
    options: ["English", "French", "German", "Spanish"],
  },
  {
    id: 2,
    title: "What gender do you identify with?",
    subtitle: "Please share how do you identify yourself",
    type: "single",
    options: ["Female", "Male", "Other"],
  },
  {
    id: 3,
    title: "What is your age?",
    type: "single",
    options: ["18–29 years", "30–39 years", "40–49 years", "50+"],
  },
  {
    id: 4,
    title: "What do you hate the most in a book?",
    type: "multiple",
    options: [
      "Lack of logic",
      "A slow speed",
      "Lack of humor",
      "Way too generic ending",
    ],
    maxSelect: 4,
  },
  {
    id: 5,
    title: "What are your favorite topics?",
    subtitle: "Choose up to 3 topics you like",
    type: "bubble",
    options: [
      "Werewolf",
      "Action",
      "Royal Obsession",
      "Billionaire",
      "Romance",
      "Young Adult",
      "Bad Boy",
    ],
    maxSelect: 3,
  },
];
