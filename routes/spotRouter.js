import { Router } from "express";
import validateJOI from "../middlewares/validateJOI.js";
import verifyToken from "../middlewares/verifyToken.js";
import { getAllSpots, createSpot } from "../controllers/spot.js";

const spotRouter = Router();

spotRouter
  .route("/")
  .get(verifyToken, getAllSpots)
  .post(verifyToken, createSpot);

//spotRouter
//   .route("/:id")
//   .get(getSinglePost)
//   .put(verifyToken, validateJOI(spot), updatePost)
//   .delete(verifyToken, deletePost);

export default spotRouter;
