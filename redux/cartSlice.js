import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.cartItems.find(
        (item) =>
          item.productId === newItem.productId && item.grade === newItem.grade
      );

      // console.log(existingItem);

      if (!existingItem) {
        // console.log(newItem);
        state.totalQuantity++;
        state.cartItems.push({
          cartId: newItem.cartId,
          productId: newItem.productId,
          productName: newItem.productName,
          grade: newItem.grade,
          mainImage: newItem.mainImage,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.totalPrice,
        });
        toast.success("Product Added to cart");
      } else {
        toast.info("Product is already in the cart");
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      console.log(state.totalAmount);
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.cartId === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.cartId != id);
        // state.totalQuantity = state.totalQuantity -existingItem.quantity
        state.totalQuantity--;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
