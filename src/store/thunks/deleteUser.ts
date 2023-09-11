/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ENDPOINT = 'http://localhost:3005/users';

const deleteUser = createAsyncThunk('users/delete', async (user: any) => {
  await axios.delete(`${ENDPOINT}/${user.id}`);
  return user;
});
export { deleteUser };
