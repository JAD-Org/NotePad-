import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export default new MongoClient(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/?retryWrites=true&w=majority`
);
