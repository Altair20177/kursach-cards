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
  webSite: string;
  eventAddress: string;
  dateTimeStart: string;
  dateTimeFinish: string;
  workingTime: string;
  photo1: string;
  photo2: string;
  photo3: string;
};

export type UserType = {
  id: number;
  name: string;
  surname: string;
  userRole: string;
  phone: string | null;
  email: string;
};

export type OrganizationType = null | {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  phone: string;
  organizationAddress: string;
  webSite: string;
  photo1: string;
  photo2: string;
  photo3: string;
  photo4: string;
  photo5: string;
  userId: number;
  workTime: string;
};
