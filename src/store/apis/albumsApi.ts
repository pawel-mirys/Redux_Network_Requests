import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album, User } from '../../types';
import { faker } from '@faker-js/faker';
const URL = 'http://localhost:3005';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Album'],
  endpoints(builder) {
    return {
      addAlbum: builder.mutation<Album[], User>({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }];
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
          return [{ type: 'Album', id: user.id }];
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

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
