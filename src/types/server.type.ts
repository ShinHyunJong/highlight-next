export type User = {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Song = {
  title: string;
  trackNumber: number;
  albumName: string;
  artistName: string;
  diskNumber: number;
  durationMs: number;
  isrc: string;
  appleId: string;
  spotifyId: string;
  thumbUrl: string;
  previewUrl: string;
  order?: number;
};

export type UserFav = {
  id: number;
  song: Song;
};

export type Highlight = {
  id: number;
  title: string;
  highlightImage: HighlightImage[];
  desc?: string | null;
  tags?: string | null;
  createdAt: Date;
};

export type HighlightImage = {
  id: number;
  highlightId: number;
  url: string;
  key: string;
};
