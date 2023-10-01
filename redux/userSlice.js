import { auth, database } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loader: false,
  isLogin: false,
};


const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    checkLogin: (state, action) => {
      if (auth.currentUser) {
        state.isLogin = true;
      }else{
        state.isLogin = false
      }
      console.log(state.isLogin);
    },
  },
});

export const { checkLogin } = userSlice.actions;

export default userSlice.reducer;
