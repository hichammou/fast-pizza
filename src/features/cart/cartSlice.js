import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem (type of object)
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId (type of number)
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId (type of number)

      state.cart.map((item) => {
        if (item.pizzaId === action.payload) {
          item.quantity = item.quantity + 1;
          item.totalPrice += item.unitPrice;
        }
      });
    },
    decreaseItemQuantity(state, action) {
      state.cart.map((item) => {
        if (item.pizzaId === action.payload) {
          item.quantity--;
          item.totalPrice -= item.unitPrice;
          if (item.quantity === 0)
            cartSlice.caseReducers.deleteItem(state, action);
        }
      });
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
