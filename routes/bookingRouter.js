import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  createBooking,
  deleteBooking,
  getAllBooking,
  getBooking,
} from "../controllers/booking.js";

const bookingRouter = Router();

bookingRouter
  .route("/")
  .get(verifyToken, getAllBooking)
  .post(verifyToken, createBooking);
bookingRouter
  .route("/:id")
  .get(verifyToken, getBooking)
  .delete(verifyToken, deleteBooking);

export default bookingRouter;
