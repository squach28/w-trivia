import * as admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const serviceAccountPath = path.join(
  process.cwd(),
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH as string
);

if (!serviceAccountPath) {
  throw new Error("Missing FIREBASE_SERVICE_ACOUNT_PATH env variable");
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = firebase.firestore();
