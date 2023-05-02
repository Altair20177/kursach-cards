import { $authHost, $host } from "./index";

export const createRequest = async (
  organizationName,
  categoryName,
  phone,
  address,
  userId
) => {
  const { data } = await $authHost.post("api/request", {
    organizationName,
    categoryName,
    phone,
    address,
    userId,
  });
  return data;
};

export const fetchPublishedCards = async (userId) => {
  const { data } = await $authHost.get("api/organization/getCards/" + userId);
  return data;
};

export const fetchOrganizationByAdmin = async (userId) => {
  const { data } = await $authHost.get("api/organization/getByAdmin/" + userId);
  return data;
};

export const updateOrganization = async (id, organization) => {
  const { data } = await $authHost.post(
    `api/organization/update/${id}`,
    organization
  );
  return data;
};
