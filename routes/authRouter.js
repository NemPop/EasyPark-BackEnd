import { Router } from "express";
import { signInUser, signUpUser, getUser } from "../controllers/auth.js";
import { signIn, signUp } from "../joi/schemas.js";
import validateJOI from "../middlewares/validateJOI.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.post("/signup", validateJOI(signUp), signUpUser);
authRouter.post("/signin", validateJOI(signIn), signInUser);
authRouter.get("/me", verifyToken, getUser);

export default authRouter;
