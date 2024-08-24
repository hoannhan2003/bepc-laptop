import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    console.log('Request Body for addToCart:', req.body); // Logging request body

    let userData = await userModel.findById(req.body.userId);
    console.log('User Data:', userData); // Logging user data

    let cartData = userData.cartData;
    console.log('Current Cart Data:', cartData); // Logging current cart data

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    console.log('Updated Cart Data:', cartData); // Logging updated cart data

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log('Error in addToCart:', error); // Logging error
    res.json({ success: false, message: "Error" });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    console.log('Request Body for removeFromCart:', req.body); // Logging request body

    let userData = await userModel.findById(req.body.userId);
    console.log('User Data:', userData); // Logging user data

    let cartData = userData.cartData;
    console.log('Current Cart Data:', cartData); // Logging current cart data

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      console.log('Cart Data After Decrement:', cartData); // Logging cart data after decrement

      if (cartData[req.body.itemId] <= 0) {
        delete cartData[req.body.itemId];
        console.log('Cart Data After Removal:', cartData); // Logging cart data after removal
      }

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Removed from cart" });
    } else {
      res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.log('Error in removeFromCart:', error); // Logging error
    res.json({ success: false, message: "Error" });
  }
};

// fetch user cartdata
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData});
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message:"Error"});
  }
};

export { addToCart, removeFromCart, getCart };
