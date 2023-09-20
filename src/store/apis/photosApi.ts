import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album, Photo } from '../../types';
import { faker } from '@faker-js/faker';

const URL = 'http://localhost:3005';

const photosApi = createApi({
  reducerPath: 'photos',
  tagTypes: ['Photo', 'AlbumsPhotos'],
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query<Photo[], Album>({
        providesTags: (result, error, album) => {
          const tags = result?.map((photo) => {
            return { type: 'Photo', id: photo.id };
          });
          tags?.push({ type: 'AlbumsPhotos', id: album.id });
          return tags;
        },
        query: (album: Album) => {
          return {
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          };
        },
      }),
      addPhoto: builder.mutation<Photo[], Album>({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'AlbumsPhotos', id: album.id }];
        },
        query: (album: Album) => {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              albumId: album.id,
              url: faker.image.urlLoremFlickr({
                category: 'abstract',
                width: 150,
                height: 150,
              }),
            },
          };
        },
      }),
      deletePhoto: builder.mutation<Photo[], Photo>({
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'Photo', id: photo.id }];
        },
        query: (photo: Photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photosApi;

export { photosApi };
