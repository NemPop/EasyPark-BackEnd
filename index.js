import express from "express";
import morgan from "morgan";
import authRouter from "./routes/authRouter.js";
import spotRouter from "./routes/spotRouter.js";
import "./db/dataBase.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const port = process.env.PORT || 5000;

process.env.NODE_ENV !== "production" && app.use(morgan("dev"));

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/spots", spotRouter);
app.use("*", (req, res) => res.status(404));
app.use(errorHandler);
