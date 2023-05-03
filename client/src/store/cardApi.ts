import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CardType } from "../types";

interface IUpdateCardRequest {
  id: number;
  card: Omit<CardType, "id">;
}

export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:5000/api/card` }),
  tagTypes: ["Card", "AcceptedCard", "CardDetails"],
  endpoints: (builder) => ({
    getCardById: builder.query<CardType, string>({
      query: (id: string) => `/${id}`,
      providesTags: ["CardDetails"],
    }),
    updateCard: builder.mutation<string, IUpdateCardRequest>({
      query: ({ id, card }) => ({
        url: `/${id}`,
        method: "PUT",
        body: card,
      }),
      invalidatesTags: ["Card", "AcceptedCard", "CardDetails"],
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
      providesTags: ["Card", "AcceptedCard", "CardDetails"],
    }),
    addCard: builder.mutation<CardType, undefined>({
      query: () => "/",
      invalidatesTags: ["Card"],
    }),
    acceptCard: builder.mutation<CardType, number>({
      query: (id: number) => `/acceptCard/${id}`,
      invalidatesTags: ["Card", "AcceptedCard", "CardDetails"],
    }),
    rejectCard: builder.mutation<CardType, number>({
      query: (id: number) => `/rejectCard/${id}`,
      invalidatesTags: ["Card", "AcceptedCard", "CardDetails"],
    }),
  }),
});

export const {
  useAddCardMutation,
  useGetCardsByCategoryQuery,
  useGetCardsByAcceptQuery,
  useAcceptCardMutation,
  useRejectCardMutation,
  useGetCardsByOrganizationQuery,
  useGetCardByIdQuery,
  useUpdateCardMutation,
} = cardApi;
