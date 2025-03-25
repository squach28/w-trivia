import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { questionsRouter } from "./routes/questionsRouter";
import { loadOrigins } from "./utils/cors";
import { responsesRouter } from "./routes/responsesRouter";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const corsOption = loadOrigins();

app.use(cors(corsOption));
app.use(express.json());

app.use("/questions", questionsRouter);
app.use("/responses", responsesRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
