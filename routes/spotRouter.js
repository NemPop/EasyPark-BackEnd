import { Router } from "express";
import validateJOI from "../middlewares/validateJOI.js";
import verifyToken from "../middlewares/verifyToken.js";
import {
  getAllSpots,
  createSpot,
  getSingleSpot,
  deleteSpot,
  onlyMeinSpots,
} from "../controllers/spot.js";

const spotRouter = Router();

spotRouter
  .route("/")

  .get(verifyToken, getAllSpots)
  .post(verifyToken, createSpot);
spotRouter.route("/userId").get(verifyToken, onlyMeinSpots);
spotRouter
  .route("/:id")
  .get(verifyToken, getSingleSpot)
  //   .put(verifyToken, validateJOI(spot), updatePost)
  .delete(verifyToken, deleteSpot);

export default spotRouter;
