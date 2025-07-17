import userModel from '../models/userModel.js'

// add Items To User Cart
export const addToCart = async (req, res) => {
  try {
    const { cartKey, itemId, custom } = req.body;   // 👈 front‑end sends these
    const user = await userModel.findById(req.userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cart = user.cart;

    // 🔹 If custom object exists
    if (custom) {
      if (cart.get(cartKey)) {
        cart.get(cartKey).quantity += 1;
      } else {
        cart.set(cartKey, { ...custom, id: itemId, quantity: 1 });
      }
    } else {
      // 🔹 Normal item
      const prev = cart.get(itemId) || 0;
      cart.set(itemId, prev + 1);
    }

    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error" });
  }
};


//remove items from user Cart
export const removeFromCart = async (req, res) => {
  try {
    const { cartKey } = req.body;        // cartKey is either unique key or itemId
    const user = await userModel.findById(req.userId);
    const cart = user.cart;

    const entry = cart.get(cartKey);

    if (typeof entry === "number") {
      cart.set(cartKey, entry - 1);
      if (cart.get(cartKey) <= 0) cart.delete(cartKey);
    } else if (entry && entry.quantity) {
      entry.quantity -= 1;
      if (entry.quantity <= 0) cart.delete(cartKey);
      else cart.set(cartKey, entry);
    }

    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error" });
  }
};


//get user Cart List
export const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error" });
  }
};
