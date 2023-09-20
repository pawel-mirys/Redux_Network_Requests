export type User = {
  id: string;
  name: string;
};

export type Album = {
  id: number | string;
  title: string;
  userId: number | string;
};

export type Photo = {
  id: number | string;
  url: string;
  albumId: number | string;
};
