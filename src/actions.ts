/*import { Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment } from './types/actions.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: 'Update the path',
}); // TODO : Update this value !

export const fetchCatsCommit = (payload: unknown): FetchCatsCommit => ({ type: 'FETCH_CATS_COMMIT', payload });

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });
export type Actions = Increment | Decrement; */

import { Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment, SelectPicture, CloseModal } from './types/actions.type';
import { Picture } from './types/picture.type';

// ✅ Action creators for counter
export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

// ✅ Action creator for fetching pictures
export const fetchCatsRequest = (path: string): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path,
});

// ✅ Fix: Ensure payload is explicitly `Picture[]`
export const fetchCatsCommit = (payload: Picture[]): FetchCatsCommit => ({
  type: 'FETCH_CATS_COMMIT',
  payload,
});

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({
  type: 'FETCH_CATS_ROLLBACK',
  error,
});

// ✅ Fix: Add missing actions
export const selectPicture = (picture: Picture): SelectPicture => ({
  type: 'SELECT_PICTURE',
  picture,
});

export const closeModal = (): CloseModal => ({
  type: 'CLOSE_MODAL',
});

// ✅ Include all actions in the `Actions` type
export type Actions =
  | Increment
  | Decrement
  | SelectPicture
  | CloseModal
  | FetchCatsRequest
  | FetchCatsCommit
  | FetchCatsRollback;
