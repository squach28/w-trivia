import express from "express";
import { firebase } from "../utils/firebase";
import { Question } from "../types/Question";

export const getQuestion = (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Success" });
};

export const addQuestions = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { questions } = req.body;

    if (questions === undefined) {
      res.status(400).json({ message: "Missing questions in body" });
    }

    const questionsCollection = firebase.firestore().collection("questions");
    const latestQuestion = await questionsCollection
      .orderBy("timestamp", "desc")
      .limit(1)
      .get();

    const latestDate: Date =
      latestQuestion.size > 0
        ? latestQuestion.docs[0].data()["date"]
        : new Date();

    const questionsWithDates = questions.map(
      (question: Question, index: number) => {
        const date: Date = new Date(latestDate);
        date.setDate(latestDate.getDate() + index);
        return {
          ...question,
          date: date.toISOString(),
        };
      }
    );

    const batch = firebase.firestore().batch();

    questionsWithDates.forEach((question: Question) => {
      batch.create(questionsCollection.doc(), question);
    });

    await batch.commit();

    res.status(201).json({ message: "Success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};
