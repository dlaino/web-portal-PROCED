import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const adminsApi = createApi({
  reducerPath: "adminsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admins`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    getAllAdmins: builder.query<Admin[], null>({
      query: () => "getAllAdmins",
    }),

    getAdminById: builder.query<Admin, string>({
      query: (id) => `getAdmin/${id}`,
    }),

    getAdminByIdNumber: builder.query<Admin, number>({
      query: (idNumber) => `getAdminByIdNumber/${idNumber}`,
    }),

    updateAdmin: builder.mutation<
      any,
      { id: string; updateAdmin: Partial<Admin> }
    >({
      query: ({ id, updateAdmin }) => ({
        url: `updateAdmin/${id}`,
        method: "PATCH",
        params: { id },
        body: updateAdmin,
      }),
    }),

    updatePassword: builder.mutation<
      any,
      { id: string; passwords: UpdatePassword }
    >({
      query: ({ id, passwords }) => ({
        url: `updatePassword/${id}`,
        method: "PATCH",
        params: { id },
        body: passwords,
      }),
    }),

    forgotPassword: builder.mutation<any, ForgotAdminsPassword>({
      query: (ForgotAdminsPassword) => ({
        url: "forgotPassword",
        method: "PATCH",
        body: ForgotAdminsPassword,
      }),
    }),

    banAdmin: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `banAdmin/${id}`,
        method: "PATCH",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useGetAdminByIdQuery,
  useGetAdminByIdNumberQuery,
  useUpdateAdminMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useBanAdminMutation,
} = adminsApi;
