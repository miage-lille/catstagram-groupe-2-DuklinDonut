import { State } from './reducer';

// ✅ Define the selectors
export const counterSelector = (state: State) => state.counter;
export const getSelectedPicture = (state: State) => state.pictureSelected;
export const picturesSelector = (state: State) => state.pictures;
