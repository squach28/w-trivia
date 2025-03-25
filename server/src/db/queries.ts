export const queries = {
  getResponseByUserIdAndDate:
    "SELECT * FROM responses WHERE user_id = $1 AND date = $2",
};
