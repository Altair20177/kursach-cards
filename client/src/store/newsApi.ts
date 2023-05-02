import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INews } from "../types";

interface IUpdateNewsRequest {
  news: INews;
  id: number;
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/news` }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getNews: builder.query<INews[], undefined>({
      query: () => "",
      providesTags: ["News"],
    }),
    getNewById: builder.query<INews, number>({
      query: (id: number) => `/${id}`,
      providesTags: ["News"],
    }),
    createNews: builder.mutation<number, INews>({
      query: (news) => ({
        url: `/`,
        body: news,
      }),
      invalidatesTags: ["News"],
    }),
    updateNews: builder.mutation<INews, IUpdateNewsRequest>({
      query: ({ id, news }) => ({
        url: `/${id}`,
        body: news,
        method: "PUT",
      }),
      invalidatesTags: ["News"],
    }),
    deleteNewsById: builder.mutation<INews, number>({
      query: (id: number) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetNewByIdQuery,
  useDeleteNewsByIdMutation,
  useCreateNewsMutation,
  useUpdateNewsMutation,
} = newsApi;
