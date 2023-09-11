import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { usersReducer } from './slices/usersSlice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { albumsApi } from './apis/albumsApi';

const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(albumsApi.middleware);
  },
});

setupListeners(store.dispatch);

const useAppDispatch: () => typeof store.dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
  useSelector;

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/deleteUser';
export { store, useAppDispatch, useAppSelector };
export { useFetchAlbumsQuery } from './apis/albumsApi';
