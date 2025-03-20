import express from "express";
import dotenv from "dotenv";
import { questionsRouter } from "./routes/questionsRouter";
import { firebase } from "./utils/firebase";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/questions", questionsRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
