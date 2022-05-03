import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Booking from "../models/Booking.js";
import Spot from "../models/Spot.js";

export const getAllBooking = AsyncHandler(async (req, res, next) => {
  const {
    user: { _id: userId },
  } = req;

  const booking = await Booking.find({ user: userId })
    .populate("user")
    .populate("spot");
  res.json(booking);
});

export const createBooking = AsyncHandler(async (req, res) => {
  const {
    body: { startDate, endDate, spot },
    user: { _id: user },
  } = req;
  console.log(user);
  let newBooking = await Booking.create({
    ...{ startDate, endDate, spot },
    user,
  });
  console.log(startDate, endDate);

  newBooking = await newBooking.populate("user");
  newBooking = await newBooking.populate("spot");
  await newBooking.spot.time.booked.push({
    startDate: startDate,
    endDate: endDate,
  });

  const booked = { startDate: startDate, endDate: endDate };
  await Spot.findByIdAndUpdate(
    { _id: newBooking.spot._id },
    { $push: { "time.booked": booked } }
  ).exec();
  res.status(201).json(newBooking);
});
