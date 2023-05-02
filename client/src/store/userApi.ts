import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../types";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/user",
  }),
  endpoints: (builder) => ({
    getAdmins: builder.query<UserType[], undefined>({
      query: () => "/admins",
      providesTags: ["User"],
    }),
    deleteAdmins: builder.mutation<number, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useDeleteAdminsMutation, useGetAdminsQuery } = userApi;
