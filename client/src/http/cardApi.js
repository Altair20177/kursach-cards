import { $authHost, $host } from "./index";

export const createCard = async (
  cardName,
  dateTimeStart,
  dateTimeFinish,
  description,
  eventAddress,
  webSite,
  categoryId,
  organizationId
) => {
  const { data } = await $authHost.post("api/card", {
    cardName,
    dateTimeStart,
    dateTimeFinish,
    description,
    eventAddress,
    webSite,
    categoryId,
    organizationId,
  });
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

export const addToFavourites = async (cardId, userId) => {
  const { data } = await $host.post("api/favourite", {
    cardId,
    userId,
  });
  return data;
};
