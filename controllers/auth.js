import bcrypt from "bcrypt";
import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signUpUser = AsyncHandler(async (req, res) => {
  const {
    body: { name, email, password },
  } = req;

  const found = await User.findOne({ email });
  if (found) throw new ErrorResponse("Email already taken");

  const hash = await bcrypt.hash(password, 5);
  const { _id } = await User.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign({ _id }, process.env.JWT_SECRET);
  res.status(201).json({ token });
});

export const signInUser = AsyncHandler(async (req, res) => {
  const {
    body: { email, password },
  } = req;

  const found = await User.findOne({ email }).select("+password");
  if (!found) throw new ErrorResponse("User does not exist");

  const match = await bcrypt.compare(password, found.password);
  if (!match) throw new ErrorResponse("Password is incorrect");

  const token = jwt.sign({ _id: found._id }, process.env.JWT_SECRET);
  res.status(201).json({ token });
});

export const getUser = (req, res) => {
  res.json(req.user);
};

export const changeUser = AsyncHandler(async (req, res) => {
  const {
    body: { name, email, password, taxId },
    params: { id },
  } = req;

  const found = await User.findById({ _id: id });
  if (!found)
    throw new ErrorResponse(`User with id of ${id} doesn't exist`, 404);

  const match = await User.findOne({ email });
  if (match) throw new ErrorResponse("Email already taken");

  const hash = await bcrypt.hash(password, 5);
  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    { name, email, password: hash, taxId }
  );
  res.status(201).json(updatedUser);
});
