import express from "express";

export const getQuestion = (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Success" });
};
