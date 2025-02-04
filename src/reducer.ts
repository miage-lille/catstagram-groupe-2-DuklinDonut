import { Option, some, none } from 'fp-ts/lib/Option';
import { Actions } from './types/actions.type';
import { Picture, PictureState } from './types/picture.type';
import { Loop, loop, Cmd } from 'redux-loop';
import { error } from 'console';

const fetchPictures = async (url: string): Promise<Picture[]> => {
  const response = await fetch(url);
  const data = await response.json();

  return data.hits.map((img: any) => ({
    previewFormat: img.previewURL,
    webFormat: img.webformatURL,
    author: img.user,
    largeFormat: img.largeImageURL,
  }));
};

export type State = {
  counter: number;
  pictures: PictureState;
  pictureSelected: Option<Picture> | null;
};

export const defaultState: State = {
  counter: 0,
  pictures: { kind: 'IDLE' }, // ✅ Default state as IDLE
  pictureSelected: none,
};

export const reducer = (state: State = defaultState, action: Actions): State | Loop<State> => {
  if (!state) return defaultState;

  switch (action.type) {
    case 'INCREMENT':
      return loop(
        { ...state, counter: state.counter + 1 },
        Cmd.action({
          type: 'FETCH_CATS_REQUEST',
          method: 'GET',
          path: `https://pixabay.com/api/?key=24523143-8a90135b40ac6e775ba6758cb&per_page=${state.counter + 1}&q=cat`, // ✅ Adjust per_page dynamically
        })
      );

    case 'DECREMENT':
      return loop(
        { ...state, counter: Math.max(3, state.counter - 1) },
        Cmd.action({
          type: 'FETCH_CATS_REQUEST',
          method: 'GET',
          path: `https://pixabay.com/api/?key=24523143-8a90135b40ac6e775ba6758cb&per_page=${state.counter - 1}&q=cat`, // ✅ Adjust per_page dynamically
        })
      );

    case 'SELECT_PICTURE':
      return { ...state, pictureSelected: some(action.picture) };

    case 'CLOSE_MODAL':
      return { ...state, pictureSelected: none };

    case 'FETCH_CATS_REQUEST':
      return loop(
        { ...state, pictures: { kind: 'LOADING' } }, // ✅ Ensure correct state transition
        Cmd.run(fetchPictures, {
          args: [action.path],
          successActionCreator: (pictures: Picture[]) => ({ type: 'FETCH_CATS_COMMIT', payload: pictures }),
          failActionCreator: (error: Error) => ({ type: 'FETCH_CATS_ROLLBACK', error }),
        })
      );
  

    case 'FETCH_CATS_COMMIT':
      return {
        ...state,
        pictures: {
          kind: 'SUCCESS',
          pictures: Array.isArray(action.payload) ? action.payload : [], // ✅ Ensure payload is an array
        },
      };
    

    case 'FETCH_CATS_ROLLBACK':
      return {
        ...state,
        pictures: {
          kind: 'FAILURE',
          error: error instanceof Error ? error.message : String(error) || 'Unknown error', // ✅ Handle all cases safely
        },
      };
    
  


    default:
      return state;
  }
};

export default reducer;
