import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    id: String,          // original item _id
    size: String,
    crusts: [String],
    cheese: [String],
    extraCheese: [String],
    toppings: [String],
    customPrice: Number,
    quantity: Number
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },

    // 🔥 Map key = unique cartKey, value can be number OR object
    cart: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { minimize: false }
);

export default mongoose.models.user || mongoose.model("user", userSchema);
