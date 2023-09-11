import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album, User } from '../../types';

const URL = 'http://localhost:3005';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query<Album[], User>({
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

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
