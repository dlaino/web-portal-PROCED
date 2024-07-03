import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerUsersApi = createApi({
  reducerPath: "registerUsersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),

  endpoints: (builder) => ({
    validateThatThePatientExist: builder.mutation<
      [],
      { idType: string; idNumber: number }
    >({
      query: ({ idType, idNumber }) => ({
        url: `validatePatient`,
        method: "POST",
        body: { idType, idNumber },
      }),
    }),

    validatePatientRegister: builder.mutation<
      [],
      { id_type: number; id_number: number }
    >({
      query: ({ id_type, id_number }) => ({
        url: `validatePatientRegister`,
        method: "POST",
        body: { id_type, id_number },
      }),
    }),

    createUserPatient: builder.mutation<User, Partial<User>>({
      query: (newPatient) => ({
        url: `registerUserPatient`,
        method: "POST",
        body: newPatient,
      }),
    }),

    createUserEps: builder.mutation<User, Partial<User>>({
      query: (newEps) => ({
        url: `registerUserEps`,
        method: "POST",
        body: newEps,
      }),
    }),
  }),
});

export const {
  useValidateThatThePatientExistMutation,
  useValidatePatientRegisterMutation,
  useCreateUserPatientMutation,
  useCreateUserEpsMutation,
} = registerUsersApi;
