import express from "express";
import { db } from "../db/db";
import { queries } from "../db/queries";

export const getResponse = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, date } = req.query;

    if (userId === undefined) {
      res.status(400).json({ message: "userId missing from request" });
      return;
    }

    let dateToCheck;
    if (date === undefined || Number.isNaN(Date.parse(date as string))) {
      dateToCheck = new Date();
    } else {
      dateToCheck = new Date(Date.parse(date as string));
    }

    const result = await db.query(queries.getResponseByUserIdAndDate, [
      userId,
      dateToCheck.toDateString(),
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
  const client = await db.connect();
  try {
    const { questionId, date, userId, correct } = req.body;

    if (
      questionId === undefined ||
      date === undefined ||
      userId === undefined ||
      correct === undefined
    ) {
      res.status(400).json({
        message: "Missing questionId, date, userId, or correct field",
      });
      return;
    }

    if (Number.isNaN(Date.parse(date))) {
      res.status(400).json({ message: "Date is invalid" });
      return;
    }

    await client.query("BEGIN");
    await client.query(queries.insertResponse, [
      questionId,
      userId,
      new Date(date),
      correct,
    ]);
    await client.query("COMMIT");

    res.status(201).json({ message: "Success" });
    return;
  } catch (e) {
    console.log(e);
    await client.query("ROLLBACK");
    res.status(500).json({ message: "Something went wrong" });
    return;
  } finally {
    client.release();
  }
};
