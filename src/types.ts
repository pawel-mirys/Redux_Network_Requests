export type User = {
  id: string;
  name: string;
};

export type Album = {
  id: number;
  title: string;
  userId: number;
};

export type Photos = {
  id: number;
  url: string;
  albumId: number;
};
