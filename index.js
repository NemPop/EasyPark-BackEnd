import express from "express";
import morgan from "morgan";
const app = express();
const port = process.env.PORT || 5000;

process.env.NODE_ENV !== "production" && app.use(morgan("dev"));

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);

//app.use("/auth", authRouter);
//app.use("/spots", postsRouter);
app.use("*", (req, res) => res.status(404));
//app.use(Err);
