import { createSlice } from "@reduxjs/toolkit";

export const informationSlice = createSlice({
  name: "information",
  initialState: {
    accountAddress: "",
    isLoggedIn:
      sessionStorage.getItem("isLoggedIn") == null
        ? false
        : sessionStorage.getItem("isLoggedIn").toLowerCase() === "true",
    chainId: "",
  },
  reducers: {
    setAccountAddress: (state, action) => {
      state.accountAddress = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      sessionStorage.setItem("isLoggedIn", action.payload);
    },
    setChainId: (state, action) => {
      state.chainId = action.payload;
    },
  },
});

export const { setAccountAddress, setIsLoggedIn, setChainId } =
  informationSlice.actions;

export default informationSlice.reducer;
