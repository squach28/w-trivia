export type Question = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;
  difficulty: string;
  type: string;
  category: string;
};
