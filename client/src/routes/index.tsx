import QuestionItem from "@/components/QuestionItem";
import { Question } from "@/types/Question";
import { CircularProgress, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const id = localStorage.getItem("uuid");
    if (!id) {
      localStorage.setItem("uuid", uuidv4());
    }

    const fetchQuestion = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/questions`
        );
        const data = await response.json();
        setQuestion(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    const isQuestionAnswered = async (date: Date) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/responses?userId=${localStorage.getItem("uuid")}&date=${date}`
        );
        if (response.ok) {
          return true;
        }

        return false;
      } catch (e) {
        console.log(e);
        throw new Error("Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    isQuestionAnswered(new Date()).then((result) => {
      if (result) {
      } else {
        fetchQuestion();
      }
    });
  }, []);
  return (
    <main className="p-4">
      {loading ? <CircularProgress /> : null}
      {question ? <QuestionItem question={question} /> : null}
      {!loading && question === null ? (
        <Typography>You answered today's question!</Typography>
      ) : null}
    </main>
  );
}
