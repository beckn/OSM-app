import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  transactionId: "",
};

const transactionIdSlice = createSlice({
  name: "transactionId",
  initialState,
  reducers: {
    addTransactionId(state, action: PayloadAction<string>) {
      state.transactionId = action.payload;
    },
  },
});

export const transactionIdActions = transactionIdSlice.actions;

export default transactionIdSlice.reducer;
