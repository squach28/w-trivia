import express from "express";
import { db } from "../db/db";
import { queries } from "../db/queries";

export const getResponse = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, date } = req.params;

    if (userId === undefined) {
      res.status(400).json({ message: "userId missing from request" });
      return;
    }
    let dateToCheck;
    if (date === undefined || Number.isNaN(Date.parse(date))) {
      dateToCheck = new Date();
    } else {
      dateToCheck = new Date(date);
    }

    const result = await db.query(queries.getResponseByUserIdAndDate, [
      userId,
      dateToCheck,
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Response does not exist" });
      return;
    }

    const response = result.rows[0];

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};

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
