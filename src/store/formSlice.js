import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  country: "USA",
  agreeToTerms: false,
  gender: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
