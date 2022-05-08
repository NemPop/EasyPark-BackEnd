import AsyncHandler from "../utils/AsyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import stripe from "stripe";

export const createStripe = AsyncHandler(async (req, res, next) => {
  const { items } = req.body;
  console.log(items);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send(201).json({ paymentIntent });
});
