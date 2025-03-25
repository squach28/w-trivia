import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export const loadOrigins = () => {
  try {
    const data = fs.readFileSync(
      process.env.CORS_ORIGIN_CONFIG_PATH as string,
      "utf8"
    );
    const origins = JSON.parse(data);
    return origins;
  } catch (e) {
    return [];
  }
};
