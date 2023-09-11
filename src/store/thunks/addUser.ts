import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { User } from '../../types';

const ENDPOINT = 'http://localhost:3005/users';

const addUser = createAsyncThunk<User>('users/add', async () => {
  const response = await axios.post(ENDPOINT, {
    name: faker.person.firstName(),
  });

  return response.data;
});

export { addUser };
