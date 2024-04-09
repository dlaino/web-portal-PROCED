import { createSlice } from "@reduxjs/toolkit";

const initialState: UserLogin = {
  id_type: 0,
  id_number: 0,
  password: "",
  verification_code: 0,
  idTypeOptions: [],
  errors: [],
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setIdTypeOptions: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setIdType: (state, action) => {
      state.id_type = action.payload;
    },
    setIdNumber: (state, action) => {
      state.id_number = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCode: (state, action) => {
      state.verification_code = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginState: (state) => {
      state.id_type = initialState.id_type;
      state.id_number = initialState.id_number;
      state.password = initialState.password;
      state.verification_code = initialState.verification_code;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdTypeOptions,
  setIdType,
  setIdNumber,
  setPassword,
  setVerificationCode,
  setErrors,
  resetLoginState,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;
