import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { questionsRouter } from "./routes/questionsRouter";

dotenv.config();

const PORT = process.env.PORT || 3000;
const corsOption = {
  origin: process.env.CORS_ORIGIN,
};

const app = express();

app.use(cors(corsOption));
app.use(express.json());

app.use("/questions", questionsRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
