import express from "express";
import { firestore } from "../utils/firebase";
import { Question } from "../types/Question";

export const getQuestion = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const date = req.query.date
      ? new Date(Date.parse(req.query.date as string)).toLocaleDateString()
      : new Date().toLocaleDateString();
    const questionsCollection = firestore.collection("questions");

    const query = questionsCollection.where("date", "==", date);
    const querySnapshot = await query.get();
    if (querySnapshot.docs.length === 0) {
      res
        .status(404)
        .json({ message: "Question for this date doesn't exist...yet" });
      return;
    }
    const result = querySnapshot.docs[0].data();
    const question = {
      type: result.type,
      question: result.question,
      category: result.category,
      correctAnswer: result.correct_answer,
      incorrectAnswers: result.incorrect_answers,
      date: result.date,
    };
    res.status(200).json(question);
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
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

    const questionsCollection = firestore.collection("questions");
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
          date: date.toLocaleDateString(),
        };
      }
    );

    const batch = firestore.batch();

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
