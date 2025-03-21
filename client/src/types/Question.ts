export type Question = {
  id: string;
  date: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;
  difficulty: string;
  type: string;
  category: string;
};
