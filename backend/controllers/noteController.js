import { ObjectID } from "bson";
import client from "../database/mongo.js";
import driver from "../database/neo4j.js";

const saveNote = async (req, res) => {
  const note = req.body;

  if (note.title === undefined || note.content === undefined) {
    res.status(400).send("Título e conteúdo devem ser informados.");
    return;
  }

  if (note.title === "" || note.content === "") {
    res.status(400).send("Título ou conteúdo não devem ser vazios.");
    return;
  }

  const userId = req.headers.authorization;

  note.userId = userId;

  const session = driver.session();

  try {
    await client.connect();
    const notesCollection = client.db("notepad").collection("notes");
    const { insertedId } = await notesCollection.insertOne(note);

    await session.run("CREATE (:Note{id:$id})", {
      id: insertedId.toString(),
    });

    await session.run(
      "MATCH (u:User{id:$userId}) MATCH (n:Note{id:$noteId}) CREATE (u)-[r:CRIOU]->(n)",
      { userId: userId, noteId: insertedId.toString() }
    );

    res.status(201).send("Nota criada.");
  } catch {
    res.status(400).send("Falha ao salvar.");
  } finally {
    client.close();
  }
};

const listNotes = async (req, res) => {
  const { filter } = req.query;

  try {
    await client.connect();
    const notesCollection = client.db("notepad").collection("notes");

    let notes;
    if (filter && filter !== "") {
      notes = await notesCollection
        .find({ $text: { $search: filter } })
        .sort({ score: { $meta: "textScore" } })
        .toArray();
    } else {
      notes = await notesCollection.find().toArray();
    }

    const userNotes = notes.filter(
      (note) => note.userId === req.headers.authorization
    );

    res.status(200).send(userNotes);
  } catch {
    res.status(400).send("Falha ao listar.");
  } finally {
    client.close();
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  const session = driver.session();

  try {
    await client.connect();
    const notesCollection = client.db("notepad").collection("notes");
    const result = await notesCollection.deleteOne({ _id: new ObjectID(id) });

    if (result.deletedCount === 0) {
      res.status(400).send("Nota não encontrada.");
      return;
    }

    await session.run("MATCH (n:Note {id: $id}) DETACH DELETE n", { id: id });

    res.status(200).send("Nota deletada com sucesso!");
  } catch {
    res.status(400).send("Falha ao deletar.");
  } finally {
    client.close();
  }
};

const updateNote = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    await client.connect();
    const notesCollection = client.db("notepad").collection("notes");
    const result = await notesCollection.updateOne(
      { _id: new ObjectID(id) },
      {
        $set: {
          title,
          content,
        },
      }
    );

    if (result.modifiedCount === 0) {
      res.status(400).send("Nota não encontrada.");
      return;
    }

    res.status(200).send("Nota atualizada!");
  } catch {
    res.status(400).send("Falha ao atualizar.");
  } finally {
    client.close();
  }
};

export default {
  saveNote,
  listNotes,
  deleteNote,
  updateNote,
};
