import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Spot from "../models/Spot.js";

export const getAllSpots = AsyncHandler(async (req, res, next) => {
  const {
    query: { lat, lng, radius },
    user: { _id: userId },
  } = req;
  let query = {};
  if (lat && lng && radius) {
    query = {
      "position.location.coordinates": {
        $geoWithin: {
          $centerSphere: [[parseFloat(lat), parseFloat(lng)], radius / 3963.2],
        },
      },
    };
  }
  const spots = await Spot.find(query).populate("owner");
  res.json(spots);
});

export const createSpot = AsyncHandler(async (req, res) => {
  const {
    body,
    user: { _id: owner },
  } = req;
  console.log(body);
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
  console.log(id, userId);
  const found = await Spot.findById(id);
  if (!found)
    throw new ErrorResponse(`Spot with id of ${id} doesn't exist`, 404);
  if (found.owner.toString() !== userId.toString())
    throw new ErrorResponse(`Only the owner of the SPOT can delete`, 403);
  found.des;
  await Spot.deleteOne({ _id: id });
  res.json({ success: `Spot with id of ${id} was deleted` });
});
