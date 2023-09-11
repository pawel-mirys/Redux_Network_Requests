import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types';
const ENDPOINT = 'http://localhost:3005/users';

const fetchUsers = createAsyncThunk<User[]>('users/fetch', async () => {
  const response = await axios.get<User[]>(ENDPOINT);

  //Dev only
  await pause(1000);

  return response.data;
});

//Dev only
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchUsers };
