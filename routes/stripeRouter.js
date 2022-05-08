import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import Stripe from "stripe";
import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const stripe = Stripe(process.env.SECRET_KEY);
const stripeRouter = Router();

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

stripeRouter.post(
  "/",
  verifyToken,
  AsyncHandler(async (req, res, next) => {
    const { items } = req.body;
    console.log(items);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  })
);

export default stripeRouter;
