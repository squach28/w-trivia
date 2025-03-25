import express from "express";
import { addResponse } from "../controllers/responsesController";

export const responsesRouter = express.Router();

responsesRouter.post("/", addResponse);
