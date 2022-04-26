import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Spot from "../models/Spot.js";

export const getAllSpots = AsyncHandler(async (req, res, next) => {
  const spots = await Spot.find().populate("owner");
  res.json(spots);
});

export const createSpot = AsyncHandler(async (req, res) => {
  const {
    body,
    user: { _id: owner },
  } = req;

  let newSpot = await Spot.create({ ...body, owner });

  newSpot = await newSpot.populate("owner");
  res.status(201).json(newSpot);
});
