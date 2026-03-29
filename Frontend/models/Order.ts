import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  buyerId: mongoose.Types.ObjectId;
  petId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  totalAmount: number;
  status: "Pending" | "Paid" | "Shipping" | "Delivered" | "Cancelled";
  paymentStatus: "Pending" | "Completed" | "Failed";
  shippingAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipping", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    shippingAddress: { type: String, required: true },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
