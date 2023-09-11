import {
  SerializedError,
  AsyncThunkAction,
  ThunkDispatch,
  AnyAction,
} from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

type AsyncThunkActionCreator<R, T> = (
  args?: T
) => AsyncThunkAction<R, T, object>;

function useThunk<R, T>(
  thunk: AsyncThunkActionCreator<R, T>,
  args?: T
): [() => Promise<unknown>, boolean, SerializedError | null] {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SerializedError | null>(null);
  const dispatch = useDispatch<ThunkDispatch<object, object, AnyAction>>();

  const runThunk = useCallback(() => {
    setIsLoading(true);
    return dispatch(thunk(args))
      .unwrap()
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk, args]);

  return [runThunk, isLoading, error];
}

export { useThunk };
