import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function startClient() {
  const client = new MongoClient(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/?retryWrites=true&w=majority`
  );

  try {
    const notesCollection = client.db("notepad").collection("notes");

    await notesCollection.createIndex(
      { title: "text", content: "text" },
      {
        default_language: "pt",
        weights: { title: 2, content: 1 },
      }
    );
  } finally {
    return client;
  }
}

export default await startClient();
