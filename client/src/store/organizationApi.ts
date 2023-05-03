import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CardType } from "../types";

interface IOrganizationUpdateRequest {
  card: CardType;
  id: number;
}

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/organization`,
  }),
  tagTypes: ["OrganizationCard"],
  endpoints: (builder) => ({
    getOrganizationCards: builder.query<CardType[], number>({
      query: (id) => `/getCards/${id}`,
      providesTags: ["OrganizationCard"],
    }),
    updateOrganizationCard: builder.mutation<
      number,
      IOrganizationUpdateRequest
    >({
      query: ({ id, card }) => ({
        url: `/getCards/${id}`,
        method: "PUT",
        body: card,
      }),
      invalidatesTags: ["OrganizationCard"],
    }),
  }),
});

export const {
  useGetOrganizationCardsQuery,
  useUpdateOrganizationCardMutation,
} = organizationApi;
