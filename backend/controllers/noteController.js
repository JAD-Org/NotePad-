import client from "../database/mongo.js";

const saveNote = async (req, res) => {};

const listNotes = async (req, res) => {
  res.status(200).send("teste");
};

const deleteNote = async (req, res) => {};

const updateNote = async (req, res) => {};

export default {
  saveNote,
  listNotes,
  deleteNote,
  updateNote,
};
