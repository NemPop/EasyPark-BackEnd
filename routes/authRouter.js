import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/auth.js";
import { signIn, signUp } from "../joi/schemas.js";
import validateJOI from "../middlewares/validateJOI.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.post("/signup", validateJOI(signUp), signUpUser);
authRouter.post("/signin", validateJOI(signIn), signInUser);

export default authRouter;
