import { Question } from "@/types/Question";
import { Button, Grid2, Paper, Stack, Typography } from "@mui/material";

interface QuestionProps {
  question: Question;
}

const QuestionItem = ({ question }: QuestionProps) => {
  const options = [...question.incorrectAnswers, question.correctAnswer];

  const parseHTML = (html: string) => {
    const parser = new DOMParser().parseFromString(html, "text/html");
    return parser.body.textContent || "";
  };

  return (
    <article className="md:max-w-lg md:mx-auto mt-4">
      <Paper elevation={4} sx={{ p: 2 }}>
        <Stack spacing={4}>
          <Typography>{question.date}</Typography>
          <Typography variant="h5" textAlign="center">
            {question.category}
          </Typography>
          <Typography textAlign="center" variant="h6">
            {parseHTML(question.question)}
          </Typography>
          <QuestionOptions options={options} />
        </Stack>
      </Paper>
    </article>
  );
};

interface QuestionOptionsProps {
  options: Array<string>;
}

const QuestionOptions = ({ options }: QuestionOptionsProps) => {
  return (
    <Grid2 container spacing={2}>
      {options.map((option) => (
        <Grid2 key={option} size={{ xs: 12, sm: 12, md: 6 }}>
          <Button fullWidth variant="outlined">
            {option}
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default QuestionItem;
