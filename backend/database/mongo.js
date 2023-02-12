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
      { titulo: "text", conteudo: "text" },
      {
        default_language: "pt",
        weights: { titulo: 2, conteudo: 1 },
      }
    );
  } finally {
    return client;
  }
}

export default await startClient();
