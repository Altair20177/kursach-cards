export type OneNewsType = {
  id: number;
  image: string;
  text: string;
};

export type CategoryType = {
  id: number;
  image: string;
  title: string;
  link: string;
};

export type CardType = {
  id: number;
  category: string;
  name: string;
  description: string;
}