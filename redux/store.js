import cartSlice from "./cartSlice";
import userSlice from "./userSlice";

const { configureStore } = require("@reduxjs/toolkit");



const store = configureStore({
    reducer:{
        user : userSlice,
        cart : cartSlice
    }
})

export default store