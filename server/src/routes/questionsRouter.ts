import { getQuestion, addQuestions } from "../controllers/questionsController";
import express from "express";

export const questionsRouter = express.Router();

questionsRouter.get("/", getQuestion);
questionsRouter.post("/", addQuestions);
