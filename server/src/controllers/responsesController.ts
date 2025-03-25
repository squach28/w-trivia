import express from "express";

export const addResponse = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    res.status(201).json({ message: "Success" });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};
