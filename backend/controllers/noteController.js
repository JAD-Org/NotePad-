import { ObjectID } from "bson";
import client from "../database/mongo.js";

const saveNote = async (req, res) => {
  const note = req.body;

  try {
    await client.connect();
    const notesCollection = client.db("notepad").collection("notes");
    await notesCollection.insertOne(note);

    res.status(201).send("Nota criada.");
  } catch {
    res.status(400).send("Falha ao salvar.");
  } finally {
    client.close();
  }
};

const listNotes = async (req, res) => {
  //Adicionar logica de filtro por query
  try {
    await client.connect();
    const notesCollection = client.db("notepad").collection("notes");
    const notes = await notesCollection.find().toArray();

    res.status(200).send(notes);
  } catch {
    res.status(400).send("Falha ao listar.");
  } finally {
    client.close();
  }
};

const deleteNote = async (req, res) => {
  //Adicionar logica caso nao exista nota para aquele id
  const { id } = req.params;

  try {
    await client.connect();
    const notesCollection = client.db("notepad").collection("notes");
    await notesCollection.deleteOne({ _id: new ObjectID(id) });

    res.status(200).send("Nota deletada com sucesso!");
  } catch {
    res.status(400).send("Falha ao deletar.");
  } finally {
    client.close();
  }
};

const updateNote = async (req, res) => {
  //Adicionar logica caso nao exista nota para aquele id
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    await client.connect();
    const notesCollection = client.db("notepad").collection("notes");
    await notesCollection.updateOne(
      { _id: new ObjectID(id) },
      {
        $set: {
          title,
          content,
        },
      }
    );

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
