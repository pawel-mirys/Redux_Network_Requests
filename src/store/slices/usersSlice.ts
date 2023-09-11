/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';
import { deleteUser } from '../thunks/deleteUser';

type InitialUsersState = {
  data: User[];
  isLoading: boolean;
  error: SerializedError | null;
};

const usersSlice = createSlice({
  name: 'users',
  initialState: <InitialUsersState>{
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    //fetching users
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //add user
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.data = state.data.filter((user) => {
          return user.id !== action.payload.id;
        });
      }
    );
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
