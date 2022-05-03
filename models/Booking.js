import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const bookingSchema = new Schema({
  startDate: { type: String, required: [true, "Start Date is required"] },
  endDate: { type: String, required: [true, "End Date is required"] },
  spot: { type: ObjectId, ref: "Spot", required: [true, "Spot is required"] },
  user: { type: ObjectId, ref: "User", required: [true, "User is required"] },
  cardInfo: {
    cardNumber: { type: Number },
    cardHolderName: { type: String },
    ccv: { type: Number },
  },
  /* array od time and date
  taxId: { type: String, required: [true, 'Tax Id is required'] },
  */
});

export default model("Booking", bookingSchema);
