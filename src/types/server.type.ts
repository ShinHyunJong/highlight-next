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
};
