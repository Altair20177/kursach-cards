import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CardType } from "../types";

export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/card` }),
  tagTypes: ["Card", "AcceptedCard"],
  endpoints: (builder) => ({
    getCards: builder.query<CardType[], undefined>({
      query: () => "",
      providesTags: ["Card"],
    }),
    getCardsByCategory: builder.query<CardType[], string>({
      query: (categoryId: string) => `/category/${categoryId}`,
      providesTags: ["Card"],
    }),
    getCardsByAccept: builder.query<CardType[], undefined>({
      query: () => `/toAccept`,
      providesTags: ["AcceptedCard"],
    }),
    getCardsByOrganization: builder.query<CardType[], number>({
      query: (id) => `/organization/${id}`,
      providesTags: ["Card"],
    }),
    addCard: builder.mutation<CardType, undefined>({
      query: () => "/",
      invalidatesTags: ["Card"],
    }),
    acceptCard: builder.mutation<CardType, number>({
      query: (id: number) => `/acceptCard/${id}`,
      invalidatesTags: ["AcceptedCard"],
    }),
    rejectCard: builder.mutation<CardType, number>({
      query: (id: number) => `/rejectCard/${id}`,
      invalidatesTags: ["AcceptedCard"],
    }),
  }),
});

export const {
  useAddCardMutation,
  useGetCardsQuery,
  useGetCardsByCategoryQuery,
  useGetCardsByAcceptQuery,
  useAcceptCardMutation,
  useRejectCardMutation,
} = cardApi;
