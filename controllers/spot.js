import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Spot from "../models/Spot.js";

export const getAllSpots = AsyncHandler(async (req, res, next) => {
  const {
    user: { _id: userId },
  } = req;
  console.log(userId);
  const spots = await Spot.find({ owner: userId }).populate("owner");
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

export const getSingleSpot = AsyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const spot = await Spot.findById(id).populate("owner");
  if (!spot)
    throw new ErrorResponse(`Spot with id of ${id} doesn't exist`, 404);
  res.send(spot);
});

export const deleteSpot = AsyncHandler(async (req, res) => {
  const {
    params: { id },
    user: { _id: userId },
  } = req;
  const found = await Spot.findById(id);
  if (!found)
    throw new ErrorResponse(`Spot with id of ${id} doesn't exist`, 404);
  if (found.owner.toString() !== userId.toString())
    throw new ErrorResponse(`Only the owner of the SPOT can delete`, 403);
  found.des;
  await Spot.deleteOne({ _id: id });
  res.json({ success: `Spot with id of ${id} was deleted` });
});
