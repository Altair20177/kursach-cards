import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryTypeFetch } from "../types";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/category` }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryTypeFetch[], undefined>({
      query: () => "",
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
