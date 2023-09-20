import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album, User } from '../../types';
import { faker } from '@faker-js/faker';
const URL = 'http://localhost:3005';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Album', 'UsersAlbums'],
  endpoints(builder) {
    return {
      deleteAlbum: builder.mutation<Album[], Album>({
        invalidatesTags: (result, error, album) => {
          console.log(album);
          return [{ type: 'Album', id: album.id }];
        },
        query: (album: Album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
      }),

      addAlbum: builder.mutation<Album[], User>({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersAlbums', id: user.id }];
        },
        query: (user: User) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchAlbums: builder.query<Album[], User>({
        providesTags: (result, error, user) => {
          const tags = result?.map((album) => {
            return { type: 'Album', id: album.id };
          });
          tags?.push({ type: 'UsersAlbums', id: user.id });
          return tags;
        },
        query: (user: User) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} = albumsApi;
export { albumsApi };
