import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { ACCESS_TOKEN_KEY } from '@/storages/token.storage';
import type { Song } from '@/types/server.type';

export const selectedPickSong = atomWithStorage<Song[]>(
  '@highlight.discoverrealmusic.pickedSong',
  [],
);
export const signInLoading = atom<boolean>(false);
export const registerSongLoading = atom<boolean>(false);
export const accessToken = atomWithStorage<string | null>(
  ACCESS_TOKEN_KEY,
  null,
);
export const hasLogout = atom<boolean | null>(false);
