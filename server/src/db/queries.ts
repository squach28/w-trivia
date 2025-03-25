export const queries = {
  getResponseByUserIdAndDate:
    "SELECT * FROM responses WHERE user_id = $1 AND date = $2",
  insertResponse:
    "INSERT INTO responses (question_id, user_id, date, correct) VALUES ($1, $2, $3, $4)",
};
