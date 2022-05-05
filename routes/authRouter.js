import { Router } from "express";
import {
  signInUser,
  signUpUser,
  getUser,
  changeUser,
} from "../controllers/auth.js";
import { signIn, signUp } from "../joi/schemas.js";
import validateJOI from "../middlewares/validateJOI.js";
import verifyToken from "../middlewares/verifyToken.js";
import imageUploader from "../middlewares/imageUploader.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" }).single("imageURL");
const authRouter = Router();

authRouter.post("/signup", validateJOI(signUp), signUpUser);
authRouter.post("/signin", validateJOI(signIn), signInUser);
authRouter.get("/me", verifyToken, getUser);
authRouter.put(
  "/me/:id",
  verifyToken,
  imageUploader.single("image"),
  changeUser
);

export default authRouter;
