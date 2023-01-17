import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import noteRouter from "./routes/noteRouter.js";

dotenv.config();
const PORT = process.env.API_PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/note", noteRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
