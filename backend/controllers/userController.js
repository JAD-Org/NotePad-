import client from "../database/mongo.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res.status(400).send("E-mail e senha devem ser informados.");
    return;
  }

  if (email === "" || password === "") {
    res.status(400).send("E-mail e senha não devem ser vazios.");
    return;
  }
  try {
    await client.connect();
    const usersCollection = client.db("notepad").collection("users");
    const user = await usersCollection.findOne({ email: email });

    const match = user
      ? await bcrypt.compare(password, user.password)
      : undefined;

    if (user && match) {
      req.session.userId = user._id;
      res.json("Login realizado com sucesso!");
    } else {
      res.status(400).json("E-mail ou senha inválido.");
    }
  } catch {
    res.status(400).send("Falha ao logar.");
  } finally {
    client.close();
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.json("Logout realizado com sucesso!");
};

const createUser = async (req, res) => {
  const user = req.body;

  if (user.email === undefined || user.password === undefined) {
    res.status(400).send("E-mail e senha devem ser informados.");
    return;
  }

  if (user.email === "" || user.password === "") {
    res.status(400).send("E-mail e senha não devem ser vazios.");
    return;
  }

  try {
    await client.connect();

    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    const usersCollection = client.db("notepad").collection("users");
    await usersCollection.insertOne(user);

    res.status(201).send("Usuário registrado.");
  } catch {
    res.status(400).send("Falha ao salvar.");
  } finally {
    client.close();
  }
};

export default { login, logout, createUser };
