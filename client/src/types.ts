export type OneNewsType = {
  id: number;
  image: string;
  text: string;
};

export type CategoryType = {
  image: string;
  link: string;
};

export type CategoryTypeFetch = {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
};

export type CardType = {
  id: number;
  category: string;
  name: string;
  description: string;
};

export type UserType = {
  id: number;
  name: string;
  surname: string;
  userRole: string;
  phone: string | null;
  email: string;
};
