import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import noteRouter from "./routes/noteRouter.js";
import userRouter from "./routes/userRouter.js";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.API_PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "sessionToken",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);

app.use("/note", noteRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
