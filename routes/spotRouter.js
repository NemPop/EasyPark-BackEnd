import { Router } from "express";
import validateJOI from "../middlewares/validateJOI.js";
import verifyToken from "../middlewares/verifyToken.js";
import {
  getAllSpots,
  createSpot,
  getSingleSpot,
  deleteSpot,
} from "../controllers/spot.js";

const spotRouter = Router();

spotRouter
  .route("/")
  .get(verifyToken, getAllSpots)
  .post(verifyToken, createSpot);

spotRouter
  .route("/:id")
  .get(getSingleSpot)
  //   .put(verifyToken, validateJOI(spot), updatePost)
  .delete(verifyToken, deleteSpot);

export default spotRouter;
