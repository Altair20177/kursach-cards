import { $authHost, $host } from "./index";

export const createCard = async (card) => {
  const { data } = await $authHost.post("api/card", card);
  return data;
};

export const fetchCardsByCategory = async (categoryName) => {
  const { data } = await $host.post("api/card/byCategory", { categoryName });
  return data;
};

export const fetchCardsByOrganization = async (organizationId) => {
  const { data } = await $host.post("api/card/byOrganization", {
    organizationId,
  });
  return data;
};

export const fetchOrganization = async (organization) => {
  const { data } = await $host.get("api/organization/" + organization);
  return data;
};

export const addCardToFavourites = async (cardId, userId) => {
  const { data } = await $host.post("api/favourite", {
    cardId,
    userId,
  });
  return data;
};

export const fetchFavouritesCardsByUserId = async (userId) => {
  const { data } = await $host.get("api/favourite/" + userId);
  return data;
};

export const deleteCardFromFavourites = async (userId, cardId) => {
  const { data } = await $host.delete("api/favourite/" + userId + "/" + cardId);
  return data;
};

export const fetchCardsToAccept = async () => {
  const { data } = await $host.get("api/card/toAccept");
  return data;
};

export const fetchAcceptCard = async (cardId) => {
  const { data } = await $host.get("api/card/acceptCard/" + cardId);
  return data;
};

export const fetchRejectCard = async (cardId) => {
  const { data } = await $host.get("api/card/rejectCard/" + cardId);
  return data;
};

export const createCardFromExcel = async (file) => {
  const { data } = await $authHost.post(`api/card/excel`, file);
  return data;
};
