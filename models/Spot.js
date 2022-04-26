import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const spotSchema = new Schema({
  position: {
    address: { type: String, required: [true, "Adress is required"] },
    lng: { type: String },
    lat: { type: String },
  },
  owner: { type: ObjectId, ref: "User", required: [true, "Owner is required"] },
  price: {
    type: Number,
    required: [true, "Price is required"],
    select: false,
  },
  /* array od time and date
  -- in process --
  taxId: { type: String, required: [true, 'Tax Id is required'] },
  */
});

export default model("Spot", spotSchema);
