import { $authHost, $host } from "./index";

export const createCategory = async (categoryName) => {
  const { data } = await $host.post("api/category", {
    categoryName,
  });
  return data;
};

export const fetchCategories = async () => {
  const { data } = await $host.get("api/category");
  return data;
};

export const fetchOneCategory = async (id) => {
  const { data } = await $host.get("api/category/" + id);
  return data;
};
