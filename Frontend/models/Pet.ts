import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPet extends Document {
  name: string;
  category: string;
  breed: string;
  age: string;
  gender: "Male" | "Female";
  price: number;
  description: string;
  images: string[];
  sellerId: mongoose.Types.ObjectId;
  location: string;
  healthStatus: string;
  status: "Available" | "Sold" | "Pending";
  createdAt: Date;
  updatedAt: Date;
}

const PetSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // Dog, Cat, etc.
    breed: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    location: { type: String, required: true },
    healthStatus: { type: String, default: "Healthy" },
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available",
    },
  },
  { timestamps: true }
);

const Pet: Model<IPet> = mongoose.models.Pet || mongoose.model<IPet>("Pet", PetSchema);

export default Pet;
