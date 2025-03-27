export type Question = {
  id: string;
  question: string;
  correctAnswer: string;
  options: Array<string>;
  difficulty: string;
  type: string;
  category: string;
  date: Date;
};
