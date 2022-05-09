import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Booking from "../models/Booking.js";
import Spot from "../models/Spot.js";
import User from "../models/User.js";

export const getAllBooking = AsyncHandler(async (req, res, next) => {
  const {
    user: { _id: userId },
  } = req;

  let booking = await Booking.find()
    .populate("user")
    .populate("spot")
    .populate({
      path: "spot",
      populate: { path: "owner" },
    });

  res.json(booking);
});

export const createBooking = AsyncHandler(async (req, res) => {
  const {
    body: { startDate, endDate, spot },
    user: { _id: user },
  } = req;
  let newBooking = await Booking.create({
    ...{ startDate, endDate },
    spot,
    user,
  });

  newBooking = await newBooking.populate("user");
  newBooking = await newBooking.populate("spot");
  await newBooking.spot.time.booked.push({
    startDate: startDate,
    endDate: endDate,
    idBooking: newBooking._id,
  });

  const booked = {
    startDate: startDate,
    endDate: endDate,
    idBooking: newBooking._id,
  };
  await Spot.findByIdAndUpdate(
    { _id: newBooking.spot._id },
    { $push: { "time.booked": booked } }
  ).exec();
  res.status(201).json(newBooking);
});

export const getBooking = AsyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;
  const booking = await Booking.find({ _id: id })
    .populate("user")
    .populate("spot");
  if (!booking)
    throw new ErrorResponse(`Booking with id of ${id} doesn't exist`, 404);
  res.send(booking);
});

export const deleteBooking = AsyncHandler(async (req, res) => {
  const {
    params: { id },
    user: { _id: userId },
  } = req;

  const found = await Booking.findById(id);

  if (!found)
    throw new ErrorResponse(`Booking with id of ${id} doesn't exist`, 404);
  if (found.user.toString() !== userId.toString())
    throw new ErrorResponse(`Only the owner of the SPOT can delete`, 403);
  found.des;
  await Booking.deleteOne({ _id: id });
  await Spot.findByIdAndUpdate(
    { _id: found.spot._id },
    {
      $pull: {
        "time.booked": { idBooking: found._id },
      },
    }
  ).exec();

  res.json({ success: `Booking with id of ${id} was deleted` });
});
