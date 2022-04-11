import { createSlice } from "@reduxjs/toolkit";

const providerSlice = createSlice({
  name: "provider",
  initialState: {
    provider: null,
    signer: null,
    contract: null,
    contractOwner: "",
  },
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setSigner: (state, action) => {
      state.signer = action.payload;
    },
    setContract: (state, action) => {
      state.contract = action.payload;
    },
    setContractOwner: (state, action) => {
      state.contractOwner = action.payload;
    },
  },
});

export const { setProvider, setSigner, setContract, setContractOwner } =
  providerSlice.actions;

export default providerSlice.reducer;
