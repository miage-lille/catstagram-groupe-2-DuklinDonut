export type PictureState =
  | { kind: 'IDLE' }
  | { kind: 'LOADING' }
  | { kind: 'SUCCESS'; pictures: Picture[] }
  | { kind: 'FAILURE'; error: string };

export type Picture = {
  previewFormat: string;
  webFormat: string;
  author: string;
  largeFormat: string;
};
