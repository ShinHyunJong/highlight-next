export type User = {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Song = {
  id?: number;
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
  userId: number;
  highlightSong: HighlightSong[];
  highlightImage: HighlightImage[];
  desc?: string | null;
  tags?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type HighlightSong = {
  id: number;
  highlightId: number;
  songId: number;
  song?: Song;
};

export type HighlightImage = {
  id: number;
  highlightId: number;
  url: string;
  key: string;
};
