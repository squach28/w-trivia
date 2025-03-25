import express from "express";
import { addResponse, getResponse } from "../controllers/responsesController";

export const responsesRouter = express.Router();

responsesRouter.get("/", getResponse);
responsesRouter.post("/", addResponse);
