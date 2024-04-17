import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  name: "",
  last_name: "",
  user_gender: 0,
  user_id_type: 0,
  id_type_abbrev: "",
  id_number: 0,
  birthdate: "",
  affiliation_eps: "",
  email: "",
  cellphone: 0,
  whatsapp: 0,
  auth_method: 0,
  password: "",
  residence_department: "",
  residence_city: "",
  residence_address: "",
  residence_neighborhood: "",
  is_active: true,
  accept_terms: false,
  eps_company: 0,
  company_area: 0,
  user_role: 0,
  verification_code: 0,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  medical_req: [],
  errors: [],
};

export const patientSlice = createSlice({
  name: "eps",
  initialState,
  reducers: {
    setIdUserEps: (state, action) => {
      state.id = action.payload;
    },
    setNameUserEps: (state, action) => {
      state.name = action.payload;
    },
    setLastNameUserEps: (state, action) => {
      state.last_name = action.payload;
    },
    setGenderUserEps: (state, action) => {
      state.user_gender = action.payload;
    },
    setIdTypeUserEps: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdTypeAbbrevUserEps: (state, action) => {
      state.id_type_abbrev = action.payload;
    },
    setIdNumberUserEps: (state, action) => {
      state.id_number = action.payload;
    },
    setEmailUserEps: (state, action) => {
      state.email = action.payload;
    },
    setCellphoneUserEps: (state, action) => {
      state.cellphone = action.payload;
    },
    setPasswordUserEps: (state, action) => {
      state.password = action.payload;
    },
    setIsActiveUserEps: (state, action) => {
      state.is_active = action.payload;
    },
    setRoleUserEps: (state, action) => {
      state.user_role = action.payload;
    },
    setCompanyAreaUserEps: (state, action) => {
      state.company_area = action.payload;
    },
    setEpsCompanyUserEps: (state, action) => {
      state.eps_company = action.payload;
    },
    setMedicalReqUserEps: (state, action) => {
      state.medical_req = action.payload;
    },
    setErrorsUserEps: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const {
  setIdUserEps,
  setNameUserEps,
  setLastNameUserEps,
  setGenderUserEps,
  setIdTypeUserEps,
  setIdTypeAbbrevUserEps,
  setIdNumberUserEps,
  setEmailUserEps,
  setCellphoneUserEps,
  setPasswordUserEps,
  setIsActiveUserEps,
  setRoleUserEps,
  setCompanyAreaUserEps,
  setEpsCompanyUserEps,
  setMedicalReqUserEps,
  setErrorsUserEps,
} = patientSlice.actions;

export default patientSlice.reducer;
