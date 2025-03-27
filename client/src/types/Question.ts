export type Question = {
  id: string;
  date: string;
  question: string;
  correctAnswer: string;
  options: Array<string>;
  difficulty: string;
  type: string;
  category: string;
};
