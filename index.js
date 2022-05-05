import express from "express";
import morgan from "morgan";
import authRouter from "./routes/authRouter.js";
import spotRouter from "./routes/spotRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import "./db/dataBase.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import admin from "firebase-admin";
import ServiceAccountKey from "firebase-admin";

const app = express();
app.use(cors());

admin.initializeApp({
  credential: admin.credential.applicationDefault(ServiceAccountKey),
  databaseURL:
    "https://easypark-backend-default-rtdb.europe-west1.firebasedatabase.app",
});
const db = admin.firestore();
const port = process.env.PORT || 5000;
process.env.NODE_ENV !== "production" && app.use(morgan("dev"));

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/spots", spotRouter);
app.use("/booking", bookingRouter);
app.use("*", (req, res) => res.status(404));

app.use(errorHandler);
