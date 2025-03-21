import { Question } from "@/types/Question";
import {
  Button,
  Grid2,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

interface QuestionProps {
  question: Question;
}

const QuestionItem = ({ question }: QuestionProps) => {
  const options = [...question.incorrectAnswers, question.correctAnswer];
  const [userGuess, setUserGuess] = useState<string | null>(null);

  const parseHTML = (html: string) => {
    const parser = new DOMParser().parseFromString(html, "text/html");
    return parser.body.textContent || "";
  };

  const onOptionClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    const option = e.currentTarget.textContent;
    setUserGuess(option);
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
          <QuestionOptions
            options={options}
            onOptionClicked={onOptionClicked}
            userGuess={userGuess}
            correctAnswer={question.correctAnswer}
          />
        </Stack>
      </Paper>
    </article>
  );
};

interface QuestionOptionsProps {
  options: Array<string>;
  onOptionClicked: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userGuess: null | string;
  correctAnswer: string;
}

const QuestionOptions = ({
  options,
  onOptionClicked,
  userGuess,
  correctAnswer,
}: QuestionOptionsProps) => {
  const theme = useTheme();

  return (
    <Grid2 container spacing={2}>
      {options.map((option) => (
        <Grid2 key={option} size={{ xs: 12, sm: 12, md: 6 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={onOptionClicked}
            disabled={userGuess !== null}
            color={
              userGuess === null
                ? "primary"
                : option === correctAnswer
                  ? "success"
                  : "error"
            }
            sx={{
              ":disabled": {
                borderColor:
                  option === correctAnswer
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                color:
                  option === correctAnswer
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              },
            }}
          >
            {option}
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default QuestionItem;
