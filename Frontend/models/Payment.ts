import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId;
  transactionId: string;
  amount: number;
  currency: string;
  status: "Pending" | "Succeeded" | "Failed";
  method: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["Pending", "Succeeded", "Failed"],
      default: "Pending",
    },
    method: { type: String, required: true }, // Card, PayPal, etc.
  },
  { timestamps: true }
);

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
